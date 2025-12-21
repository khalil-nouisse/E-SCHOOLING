const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./admin/dashboard.routes');
const inscriptionRoutes = require('./admin/inscription.routes');
const userRoutes = require('./admin/user.routes');

router.use('/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/inscriptions', inscriptionRoutes);
router.use('/admin/users', userRoutes);



module.exports = router;
