import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import sendEmail from '../../utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;


export const register = async (firstName, lastName, email, password) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new Error('User with this email already exists.');
    } else {
      throw new Error('User exists but is not verified. Please check your email.');
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create user in database
  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      role: 'STUDENT',
      otp,
      otpExpires,
      isVerified: false,
    },
  });

  // Send OTP email
  await sendEmail(email, otp);

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
};


export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');
  if (!user.isVerified) throw new Error('Please verify your email before logging in.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid credentials');

  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  // Store refresh token in DB
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken };
};


export const refreshToken = async (providedRefreshToken) => {
  try {
    const decoded = jwt.verify(providedRefreshToken, REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.refreshToken !== providedRefreshToken) {
      throw new Error('Refresh token not found or invalidated.');
    }

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    const newAccessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error('Invalid refresh token.');
  }
};


export const logout = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });

  return { message: 'Logged out successfully' };
};

/**
 * VERIFY OTP
 */
export const verifyOTP = async (email, otp) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');
  if (user.otp !== otp) throw new Error('Invalid OTP');
  if (user.otpExpires < new Date()) throw new Error('OTP has expired');

  await prisma.user.update({
    where: { email },
    data: { isVerified: true, otp: null, otpExpires: null },
  });

  return { message: 'Account verified successfully' };
};