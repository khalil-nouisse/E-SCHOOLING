const router = require('express').Router();
const controller = require('../../controllers/student/major.controller');

router.get('/', controller.getMajors);
router.post('/create', controller.createMajor);

module.exports = router;
