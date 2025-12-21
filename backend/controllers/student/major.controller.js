const service = require('../../services/student/major.service');

const getMajors = async (req, res) => {
    try {
        const majors = await service.getActiveMajors();
        res.json(majors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching majors', error: error.message });
    }
};

const createMajor = async (req, res) => {
    try {
        const { name, code, department, isActive } = req.body;
        const major = await service.createMajor(name, code, department, isActive);
        res.json(major);
    } catch (error) {
        res.status(500).json({ message: 'Error creating major', error: error.message });
    }
};

module.exports = {
    getMajors,
    createMajor
};
