const router = require('express').Router();
const controller = require('../controllers/DashboardController');

router.get('/stats', controller.stats);

module.exports = router;