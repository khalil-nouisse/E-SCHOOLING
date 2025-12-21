const express = require('express');
const router = express.Router();

//admin routes
const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./admin/dashboard.routes');
const inscriptionRoutes = require('./admin/inscription.routes');
const userRoutes = require('./admin/user.routes');

//student routes
const studentProfileRoute = require('./student/student.profile');
const studentMajorRoutes = require('./student/major.routes');
const studentInscriptionRoutes = require('./student/inscription.routes');

router.use('/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/inscriptions', inscriptionRoutes);
router.use('/admin/users', userRoutes);



router.use('/student/majors', studentMajorRoutes);
router.use('/student', studentInscriptionRoutes);

// Detailed profile route
router.use('/student/profile', studentProfileRoute);


module.exports = router;
