const router = require('express').Router();
const controller = require('../../controllers/student/inscription.controller');
const authMiddleware = require('../../middleware/authMiddleware');

// All routes require authentication
//router.use(authMiddleware);

router.post('/apply', controller.apply);
router.get('/my-applications', controller.myApplications);

module.exports = router;
