const prisma = require('../../src/prisma/client');

async function getDashboardStats() {
  const [
    totalApplications,
    pendingApplications,
    acceptedApplications,
    totalStudents
  ] = await Promise.all([
    prisma.inscription.count(),
    prisma.inscription.count({ where: { status: 'PENDING' } }),
    prisma.inscription.count({ where: { status: 'VALIDATED' } }),
    prisma.student.count()
  ]);

  return {
    totalApplications,
    pendingApplications,
    acceptedApplications,
    totalStudents
  };
}

module.exports = { getDashboardStats };
