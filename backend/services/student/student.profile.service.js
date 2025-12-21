const prisma = require('../../src/prisma');

// Just mock simple profile data or fetch from User table if needed for Dashboard header
// In real app, we might join with Student table
const getStudentInfo = async (userId) => {
    // For now, return generic info or fetch specific stored profile data
    // This is used by the dashboard
    return {
        message: "Student Profile Loaded",
        // Add more real data later
    };
}

module.exports = {
    getStudentInfo
}