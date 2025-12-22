const prisma = require('../../src/prisma');

const bcrypt = require('bcryptjs');

async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true
    }
  });
}


async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      sex: data.sex || null,
      cin: data.cin || null,
      phoneNumber: data.phoneNumber || null,
      otp: 0,
      isVerified: true // Admin-created users are verified by default
    }
  });
}

async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data
  });
}

async function deleteUser(id) {
  return prisma.user.delete({
    where: { id }
  });
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
