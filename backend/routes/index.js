const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./admin/dashboard.routes');
const inscriptionRoutes = require('./admin/inscription.routes');
const userRoutes = require('./admin/user.routes');


const studentProfileRoute = require('./student/student.profile');

router.use('/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/inscriptions', inscriptionRoutes);
router.use('/admin/users', userRoutes);

//router.use('/student/dashboard', studentDashboardRoutes)
router.use('/student/profile', studentProfileRoute)
router.use('/api/student/majors', )
router.use('/api/student/inscriptions',)
router.use('/api/student/inscriptions/:id/documents',)

module.exports = router;
