const prisma = require('../../src/prisma');
const path = require('path');
const fs = require('fs');

exports.downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await prisma.document.findUnique({
            where: { id: parseInt(id) }
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Ideally, check is verifies admin, but routing middleware handles authorization

        const absolutePath = path.resolve(document.filePath);

        if (fs.existsSync(absolutePath)) {
            res.download(absolutePath, document.fileName);
        } else {
            console.error(`File missing at path: ${absolutePath}`);
            res.status(404).json({ message: 'File not found on server' });
        }
    } catch (error) {
        console.error("Download Error:", error);
        res.status(500).json({ message: 'Download failed', error: error.message });
    }
};
