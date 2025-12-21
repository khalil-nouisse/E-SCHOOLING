const prisma = require('../../src/prisma');


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
  return prisma.user.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
      sex: data.sex || null, // Allow null if not provided
      cin: data.cin || null, // Allow null if not provided
      phoneNumber: data.phoneNumber || null, // Allow null if not provided
      otp: 0
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
