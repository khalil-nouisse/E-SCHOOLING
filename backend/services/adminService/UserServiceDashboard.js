import prisma from '../../src/prisma.js';


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
      sex: 'MALE',
      cin: `TMP-${Date.now()}`,
      phoneNumber: '000000000',
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
