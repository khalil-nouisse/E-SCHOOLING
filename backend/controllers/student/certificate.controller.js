const certificateService = require('../../services/student/certificate.service');

exports.downloadCertificate = async (req, res) => {
    try {
        const userId = req.user.id;

        const stream = await certificateService.generateAdmissionCertificate(userId);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=admission-certificate.pdf`);

        stream.pipe(res);
    } catch (error) {
        console.error("Certificate Generation Error:", error);
        res.status(500).json({ message: 'Failed to generate certificate', error: error.message });
    }
};
