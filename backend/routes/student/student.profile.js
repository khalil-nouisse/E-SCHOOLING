const express = require('express');
const router = express.Router();

const studentProfileController = require('../../controllers/student/student.profile.controller');

router.get('/', studentProfileController.getStudentInfo);

// router.post('/');
// router.put('/');

module.exports = router;
