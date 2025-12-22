const PDFDocument = require('pdfkit');
const prisma = require('../../src/prisma');

async function generateSystemReport() {
    // 1. Fetch Stats
    const totalUsers = await prisma.user.count();
    const totalApplications = await prisma.inscription.count();
    const pendingApplications = await prisma.inscription.count({ where: { status: 'PENDING' } });
    const acceptedApplications = await prisma.inscription.count({ where: { status: 'VALIDATED' } });
    const rejectedApplications = await prisma.inscription.count({ where: { status: 'REJECTED' } });

    // Fetch applications by major
    const appsByMajor = await prisma.inscription.groupBy({
        by: ['majorId'],
        _count: {
            id: true
        }
    });

    // We need major names, so let's fetch them
    const majors = await prisma.major.findMany();
    const majorMap = {};
    majors.forEach(m => majorMap[m.id] = m.name);

    // 2. Create PDF
    const doc = new PDFDocument();

    // Header
    doc.fontSize(25).text('E-Schooling System Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // General Stats Section
    doc.font('Helvetica-Bold').fontSize(16).text('General Statistics');
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12);

    doc.text(`Total Users in System: ${totalUsers}`);
    doc.text(`Total Applications: ${totalApplications}`);
    doc.moveDown();

    doc.text(`Accepted Applications: ${acceptedApplications}`);
    doc.text(`Pending Applications: ${pendingApplications}`);
    doc.text(`Rejected Applications: ${rejectedApplications}`);
    doc.moveDown(2);

    // Applications by Program Section
    doc.font('Helvetica-Bold').fontSize(16).text('Applications by Program');
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12);

    if (appsByMajor.length === 0) {
        doc.text('No applications found.');
    } else {
        appsByMajor.forEach(item => {
            const majorName = majorMap[item.majorId] || 'Unknown Program';
            const count = item._count.id;
            doc.text(`${majorName}: ${count} applications`);
        });
    }

    doc.moveDown(2);
    doc.fontSize(10).text('End of Report', { align: 'center' });

    doc.end();
    return doc;
}

module.exports = {
    generateSystemReport
};
