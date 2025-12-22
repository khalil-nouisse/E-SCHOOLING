const router = require('express').Router();
const controller = require('../../controllers/admin/dashboard.controller');

const reportController = require('../../controllers/admin/report.controller');

router.get('/stats', controller.stats);
router.get('/reports/generate', reportController.generateReport);

module.exports = router;