const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const dashboardRoutes = require('./DashboardAdminRoute');
const inscriptionRoutes = require('./InscriptionAdminRoute');
const userRoutes = require('./UserRouteDashboard');

router.use('/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/inscriptions', inscriptionRoutes);
router.use('/admin/users', userRoutes);

module.exports = router;
