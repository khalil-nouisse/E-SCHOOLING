const router = require('express').Router();
const controller = require('../../controllers/admin/dashboard.controller');

router.get('/stats', controller.stats);

module.exports = router;