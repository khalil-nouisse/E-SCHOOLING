const prisma = require('../../src/prisma');

async function getAllInscriptions() {
  return prisma.inscription.findMany({
    include: {
      user: true,
      major: true,
      documents: true
    },
    orderBy: {
      submissionDate: 'desc'
    }
  });
}

module.exports = {
  getAllInscriptions
};



async function getInscriptionById(id) {
  return prisma.inscription.findUnique({
    where: { id },
    include: {
      user: true,
      major: true,
      documents: true,
      certifications: true,
      agent: {
        include: {
          user: true
        }
      }
    }
  });
}

async function updateInscriptionStatus(id, status, agentId, rejectionComment) {
  return prisma.$transaction(async (tx) => {
    // 1. Update the Inscription
    const inscription = await tx.inscription.update({
      where: { id },
      data: {
        status,
        validationDate: status === 'VALIDATED' ? new Date() : null,
        rejectionComment: status === 'REJECTED' ? rejectionComment : null,
        agentId
      },
      include: { user: true } // Need user ID
    });

    // 2. If Validated, promote User to Student
    if (status === 'VALIDATED') {
      // Update Role
      await tx.user.update({
        where: { id: inscription.userId },
        data: { role: 'STUDENT' }
      });

      // Create Student Record if not exists
      // Generate a simple student code (e.g., STU-YYYY-USERID)
      const studentCode = `STU-${new Date().getFullYear()}-${inscription.userId}`;

      await tx.student.upsert({
        where: { id: inscription.userId },
        create: {
          id: inscription.userId,
          statusCodeStudent: studentCode
        },
        update: {} // Already exists, do nothing
      });
    }

    return inscription;
  });
}

async function getRecentApplications(limit = 4) {
  const inscriptions = await prisma.inscription.findMany({
    take: limit,
    orderBy: { submissionDate: 'desc' },
    include: {
      user: true,
      major: true
    }
  });

  return inscriptions.map(i => ({
    id: i.id,
    name: `${i.user.first_name} ${i.user.last_name}`,
    program: i.major.name,
    status: i.status,
    date: i.submissionDate
  }));
}



module.exports = {
  getAllInscriptions,
  getInscriptionById,
  updateInscriptionStatus,
  getRecentApplications
};

