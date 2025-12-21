const prisma = require('../../src/prisma');

async function getAllInscriptions() {
  return prisma.inscription.findMany({
    include: {
      student: {
        include: {
          user: true
        }
      },
      major: true
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
      student: {
        include: {
          user: true
        }
      },
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
  return prisma.inscription.update({
    where: { id },
    data: {
      status,
      validationDate: status === 'VALIDATED' ? new Date() : null,
      rejectionComment: status === 'REJECTED' ? rejectionComment : null,
      agentId
    }
  });
}

async function getRecentApplications(limit = 4) {
  const inscriptions = await prisma.inscription.findMany({
    take: limit,
    orderBy: { submissionDate: 'desc' },
    include: {
      student: {
        include: {
          user: true
        }
      },
      major: true
    }
  });

  return inscriptions.map(i => ({
    id: i.id,
    name: `${i.student.user.first_name} ${i.student.user.last_name}`,
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

