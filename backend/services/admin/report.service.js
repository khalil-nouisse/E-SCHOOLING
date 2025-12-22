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

    const majors = await prisma.major.findMany();
    const majorMap = {};
    majors.forEach(m => majorMap[m.id] = m.name);

    // 2. Create PDF with Enhanced Design
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    // --- Colors ---
    const primaryColor = '#4f46e5'; // Indigo 600
    const secondaryColor = '#64748b'; // Slate 500
    const accentColor = '#e0e7ff'; // Indigo 100
    const successColor = '#10b981'; // Emerald 500
    const warningColor = '#f59e0b'; // Amber 500
    const errorColor = '#ef4444'; // Red 500

    // --- Helper Functions ---
    const drawCard = (x, y, width, height, label, value, color) => {
        doc.roundedRect(x, y, width, height, 8).fill(color + '10').stroke(color); // Tinted BG
        doc.fillColor(secondaryColor).fontSize(10).text(label, x + 10, y + 10);
        doc.fillColor(color).fontSize(18).font('Helvetica-Bold').text(value, x + 10, y + 25);
        doc.rect(x, y, width, height).stroke(color);
    };

    const drawTable = (x, y, data) => {
        const rowHeight = 30;
        const col1Width = 350;
        const col2Width = 100;

        // Header
        doc.fillColor(primaryColor).rect(x, y, col1Width + col2Width, rowHeight).fill();
        doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold');
        doc.text('Program Name', x + 10, y + 8);
        doc.text('Applications', x + col1Width + 10, y + 8);

        // Rows
        let currentY = y + rowHeight;
        data.forEach((row, index) => {
            if (index % 2 === 0) doc.fillColor('#f8fafc').rect(x, currentY, col1Width + col2Width, rowHeight).fill(); // Zebra stripe

            doc.fillColor('#334155').fontSize(10).font('Helvetica');
            doc.text(row.name, x + 10, currentY + 8);
            doc.text(row.count.toString(), x + col1Width + 10, currentY + 8);

            // Border (bottom)
            doc.moveTo(x, currentY + rowHeight).lineTo(x + col1Width + col2Width, currentY + rowHeight).strokeColor('#e2e8f0').stroke();
            currentY += rowHeight;
        });
    };

    // --- CONTENT ---

    // Header Stripe
    doc.save()
        .rect(0, 0, doc.page.width, 100)
        .fill(primaryColor);

    // Logo / Title area
    doc.fillColor('white')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('E-SCHOOLING', 50, 35);

    doc.fontSize(10)
        .font('Helvetica')
        .text('ADMINISTRATIVE REPORT', 50, 65);

    // Date (Top Right)
    doc.fontSize(10)
        .text(`Generated: ${new Date().toLocaleDateString()}`, doc.page.width - 200, 45, { align: 'right' });

    doc.restore();
    // REMOVED: doc.moveDown(5); // Using absolute positioning instead

    // 1. Summary Cards (Grid)
    const startY = 130;
    const cardWidth = 120;
    const gap = 20;

    // Row 1
    drawCard(50, startY, cardWidth, 60, 'Total Users', totalUsers, primaryColor);
    drawCard(50 + cardWidth + gap, startY, cardWidth, 60, 'Total Apps', totalApplications, primaryColor);
    drawCard(50 + (cardWidth + gap) * 2, startY, cardWidth, 60, 'New Today', 'N/A', secondaryColor); // Placeholder for future data

    // 2. Status Breakdown (Bar Chart Simulation)
    // REMOVED: doc.moveDown(5);
    const chartY = 230;
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('Application Status Overview', 50, chartY);

    // Status Bars
    const drawBar = (y, label, count, total, color) => {
        const maxWidth = 300;
        const width = total > 0 ? (count / total) * maxWidth : 0;

        doc.fontSize(10).font('Helvetica').fillColor('#64748b').text(label, 50, y);
        doc.rect(150, y - 5, maxWidth, 15).fill('#f1f5f9'); // Track
        if (width > 0) doc.rect(150, y - 5, width, 15).fill(color); // Bar
        doc.fillColor('#334155').text(`${count} (${total > 0 ? Math.round(count / total * 100) : 0}%)`, 150 + maxWidth + 10, y);
    };

    drawBar(chartY + 30, 'Accepted', acceptedApplications, totalApplications, successColor);
    drawBar(chartY + 55, 'Pending Review', pendingApplications, totalApplications, warningColor);
    drawBar(chartY + 80, 'Rejected', rejectedApplications, totalApplications, errorColor);

    // 3. Applications by Program Table
    const tableY = chartY + 120;
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('Applications by Program details', 50, tableY - 20);

    const tableData = appsByMajor.map(item => ({
        name: majorMap[item.majorId] || 'Unknown Program',
        count: item._count.id
    })).sort((a, b) => b.count - a.count); // Sort by popularity

    if (tableData.length === 0) {
        doc.fontSize(10).font('Helvetica-Oblique').text('No applications found.', 50, tableY);
    } else {
        drawTable(50, tableY, tableData);
    }

    // Footer - Moved up slightly to avoid bottom margin trigger
    const footerY = doc.page.height - 70; // Changed from -50
    doc.fontSize(8).fillColor('#94a3b8').text('Confidential System Report - For Internal Use Only', 50, footerY, { align: 'center' });
    doc.text('© E-Schooling Management System', 50, footerY + 12, { align: 'center' });

    doc.end();
    return doc;
}

module.exports = {
    generateSystemReport
};
