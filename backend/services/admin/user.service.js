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
  return prisma.$transaction(async (tx) => {
    // 1. Get user's inscriptions
    const inscriptions = await tx.inscription.findMany({
      where: { userId: id },
      select: { id: true }
    });
    const inscriptionIds = inscriptions.map(i => i.id);

    // 2. Delete related documents and certifications for those inscriptions
    if (inscriptionIds.length > 0) {
      await tx.document.deleteMany({
        where: { inscriptionId: { in: inscriptionIds } }
      });
      await tx.certification.deleteMany({
        where: { inscriptionId: { in: inscriptionIds } }
      });
    }

    // 3. Delete the inscriptions themselves
    await tx.inscription.deleteMany({
      where: { userId: id }
    });

    // 4. Delete Student record if exists
    await tx.student.deleteMany({
      where: { id: id }
    });

    // 5. Handle Agent: unlink from inscriptions, then delete agent record
    await tx.inscription.updateMany({
      where: { agentId: id },
      data: { agentId: null }
    });
    await tx.schoolingAgent.deleteMany({
      where: { id: id }
    });

    // 6. Finally delete the user
    return tx.user.delete({
      where: { id: id }
    });
  });
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
