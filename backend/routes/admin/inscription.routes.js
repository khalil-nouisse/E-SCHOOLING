const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/inscription.controller');


// Specific routes MUST come before wildcard routes like /:id
router.get('/recent-applications', controller.recentApplications);
router.get('/download', controller.downloadDocument);

router.get('/', controller.list);
router.get('/:id', controller.details);
router.patch('/:id/status', controller.updateStatus);


module.exports = router;
