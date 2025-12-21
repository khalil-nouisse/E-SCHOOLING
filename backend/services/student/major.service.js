const prisma = require('../../src/prisma');

async function getActiveMajors() {
    return prisma.major.findMany({
        where: { isActive: true },
        select: {
            id: true,
            name: true,
            code: true,
            department: true
        }
    });
}

async function createMajor(name, code, department, isActive) {
    return prisma.major.create({
        data: {
            name: name,
            code: code,
            department: department,
            isActive: isActive
        }
    });
}

module.exports = {
    getActiveMajors,
    createMajor
};
