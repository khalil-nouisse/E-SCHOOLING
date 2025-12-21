const service = require('../../services/student/inscription.service');

exports.apply = async (req, res) => {
    try {
        console.log('Apply Payload:', req.body);
        // Fallback for testing if authMiddleware is disabled
        const userId = req.user ? req.user.id : 1;
        console.log('User ID:', userId);
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

exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const inscriptionId = parseInt(req.params.id);
        const filePath = req.file.path;

        // TODO: Save filePath to Inscription in DB (need to update schema or just return success for now)
        // For now, we assume we just need to return success. 
        // Real implementation should update `Inscription` table if it has a `documentPath` column.

        res.json({ message: 'Document uploaded successfully', filePath });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};
