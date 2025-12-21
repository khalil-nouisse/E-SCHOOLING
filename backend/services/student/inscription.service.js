const prisma = require('../../src/prisma');

async function createInscription(userId, data) {
    const { majorId, baccalaureateType, baccalaureateYear } = data;

    if (!majorId || isNaN(parseInt(majorId))) throw new Error("Invalid Major ID");
    if (!baccalaureateYear || isNaN(parseInt(baccalaureateYear))) throw new Error("Invalid Baccalaureate Year");
    if (!baccalaureateType) throw new Error("Baccalaureate Type is required");

    // Check if already applied to this major (optional logic)
    const existing = await prisma.inscription.findFirst({
        where: { userId, majorId }
    });

    if (existing) {
        throw new Error('You have already applied to this major.');
    }

    return prisma.inscription.create({
        data: {
            userId,
            majorId: parseInt(majorId),
            baccalaureateType,
            baccalaureateYear: parseInt(baccalaureateYear),
            status: 'PENDING',
            isFirstInscription: true,
            submissionDate: new Date()
        }
    });
}

async function getUserInscriptions(userId) {
    return prisma.inscription.findMany({
        where: { userId },
        include: {
            major: true
        },
        orderBy: { submissionDate: 'desc' }
    });
}

module.exports = {
    createInscription,
    getUserInscriptions
};
