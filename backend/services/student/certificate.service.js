const PDFDocument = require('pdfkit');
const prisma = require('../../src/prisma');
const path = require('path');

async function generateAdmissionCertificate(userId) {
    // 1. Fetch Inscription & User Details
    // We get the VALIDATED inscription
    const inscription = await prisma.inscription.findFirst({
        where: {
            userId: userId,
            status: 'VALIDATED'
        },
        include: {
            user: true,
            major: true
        }
    });

    if (!inscription) {
        throw new Error("No accepted application found for this user.");
    }

    const { user, major } = inscription;

    // 2. Create PDF
    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
    });

    // --- Design ---
    // Border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
    doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke();

    // Corner Ornaments (Simple lines)
    // Top Left
    // doc.moveTo(0, 0).lineTo(100, 0).lineTo(0, 100).fill('black');

    // Header
    doc.moveDown(2);
    doc.font('Times-Bold').fontSize(30).text('E-SCHOOLING UNIVERSITY', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).text('Excellence in E-Learning', { align: 'center' });

    doc.moveDown(3);

    // Title
    doc.font('Times-Roman').fontSize(36).text('Certificate of Admission', { align: 'center', underline: true });
    doc.moveDown(2);

    // Body
    doc.font('Times-Roman').fontSize(18).text('This is to certify that', { align: 'center' });
    doc.moveDown(1);

    doc.font('Times-BoldItalic').fontSize(24).text(`${user.first_name} ${user.last_name}`, { align: 'center' });
    doc.moveDown(1);

    doc.font('Times-Roman').fontSize(18).text('has been officially admitted to the program', { align: 'center' });
    doc.moveDown(1);

    doc.font('Times-Bold').fontSize(22).text(major.name, { align: 'center', color: '#4f46e5' }); // Indigo color
    doc.fillColor('black');

    doc.moveDown(2);
    doc.fontSize(16).text(`Academic Year: ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`, { align: 'center' });

    doc.moveDown(2);

    // Important Info / Conditions
    doc.fontSize(12).text('Admission Conditions:', { underline: true });
    doc.fontSize(10).text('1. This admission is provisional subject to verification of original documents.');
    doc.text('2. Review the academic calendar on your student portal.');
    doc.text('3. Fees must be paid by the specified deadline.');

    doc.moveDown(2);

    // Signatures
    const bottomY = doc.page.height - 150;

    doc.fontSize(12);
    doc.text('Date:', 100, bottomY);
    doc.text(new Date().toLocaleDateString(), 140, bottomY);

    doc.text('Director of Admissions', doc.page.width - 300, bottomY, { align: 'right' });
    doc.moveTo(doc.page.width - 300, bottomY - 10).lineTo(doc.page.width - 100, bottomY - 10).stroke();
    // Signature placeholder
    doc.font('Times-Italic').text('Dr. Sarah Alami', doc.page.width - 250, bottomY - 25);

    doc.end();
    return doc;
}

module.exports = {
    generateAdmissionCertificate
};
