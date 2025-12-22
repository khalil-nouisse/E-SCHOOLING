const reportService = require('../../services/admin/report.service');

exports.generateReport = async (req, res) => {
    try {
        const stream = await reportService.generateSystemReport();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=system-report-${Date.now()}.pdf`);

        stream.pipe(res);
    } catch (error) {
        console.error("Report Generation Error:", error);
        res.status(500).json({ message: 'Failed to generate report', error: error.message });
    }
};
