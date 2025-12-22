const service = require('../../services/student/inscription.service');
const prisma = require('../../src/prisma');

exports.apply = async (req, res) => {
    try {
        console.log('Apply Payload:', req.body);
        const userId = req.user.id;
        console.log('User ID:', userId);
        const inscription = await service.createInscription(userId, req.body);
        res.status(201).json({ message: 'Application submitted successfully', inscription });
    } catch (error) {
        console.error("Apply Error:", error);
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
        const { documentType } = req.body;
        const inscriptionId = parseInt(req.params.id);
        const filePath = req.file.path;

        await prisma.document.create({
            data: {
                inscriptionId: inscriptionId,
                filePath: filePath,
                fileName: req.file.originalname,
                fileSize: req.file.size,
                documentType: documentType || 'OTHER',
                uploadDate: new Date(),
                isVerified: false
            }
        });

        res.json({ message: 'Document uploaded successfully', filePath });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};
