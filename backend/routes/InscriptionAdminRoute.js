const express = require('express');
const router = express.Router();
const controller = require('../controllers/InscriptionAdminController');

router.get('/', controller.list);
router.get('/:id', controller.details);
router.get('/download', controller.downloadDocument);
router.patch('/:id/status', controller.updateStatus);
router.get('/recent-applications', controller.recentApplications);


module.exports = router;
