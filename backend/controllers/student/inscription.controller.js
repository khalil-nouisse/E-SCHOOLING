const service = require('../../services/student/inscription.service');

exports.apply = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes Auth Middleware
        const inscription = await service.createInscription(userId, req.body);
        res.status(201).json({ message: 'Application submitted successfully', inscription });
    } catch (error) {
        res.status(400).json({ message: 'Application failed', error: error.message });
    }
};

exports.myApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const list = await service.getUserInscriptions(userId);
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};
