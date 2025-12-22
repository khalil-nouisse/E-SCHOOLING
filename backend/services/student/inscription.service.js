const prisma = require('../../src/prisma');

async function createInscription(userId, data) {
    const { majorId, baccalaureateType, baccalaureateYear } = data;

    if (!majorId || isNaN(parseInt(majorId))) throw new Error("Invalid Major ID");
    if (!baccalaureateYear || isNaN(parseInt(baccalaureateYear))) throw new Error("Invalid Baccalaureate Year");
    if (!baccalaureateType) throw new Error("Baccalaureate Type is required");
    if (!data.bacGrade || isNaN(parseFloat(data.bacGrade))) throw new Error("Baccalaureate Grade is required");
    if (!data.sex) throw new Error("Sex is required");
    if (!data.cin) throw new Error("CIN is required");
    if (!data.phoneNumber) throw new Error("Phone Number is required");

    // Check if already applied to this major (optional logic)
    const existing = await prisma.inscription.findFirst({
        where: { userId, majorId }
    });

    if (existing) {
        throw new Error('You have already applied to this major.');
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Update User Details
            await tx.user.update({
                where: { id: userId },
                data: {
                    sex: data.sex,
                    cin: data.cin,
                    phoneNumber: data.phoneNumber
                }
            });

            // 2. Create Inscription
            return tx.inscription.create({
                data: {
                    userId,
                    majorId: parseInt(majorId),
                    baccalaureateType,
                    baccalaureateYear: parseInt(baccalaureateYear),
                    bacGrade: parseFloat(data.bacGrade),
                    status: 'PENDING',
                    isFirstInscription: true,
                    submissionDate: new Date()
                }
            });
        });
        console.log("Transaction Result (Inscription):", JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('cin')) {
            throw new Error('The CIN provided is already in use by another account.');
        }
        throw error;
    }
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
