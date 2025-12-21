const path = require('path');

console.log('Testing imports...');

try {
    console.log('Loading DashboardAdminRoute...');
    require('./routes/DashboardAdminRoute');
    console.log('✅ DashboardAdminRoute loaded');

    console.log('Loading InscriptionAdminRoute...');
    require('./routes/InscriptionAdminRoute');
    console.log('✅ InscriptionAdminRoute loaded');

    console.log('Loading UserRouteDashboard...');
    require('./routes/UserRouteDashboard');
    console.log('✅ UserRouteDashboard loaded');

    console.log('Loading DashboardController...');
    require('./controllers/DashboardController');
    console.log('✅ DashboardController loaded');

    console.log('Loading InscriptionAdminController...');
    require('./controllers/InscriptionAdminController');
    console.log('✅ InscriptionAdminController loaded');

    console.log('Loading UserControllerDashboard...');
    require('./controllers/UserControllerDashboard');
    console.log('✅ UserControllerDashboard loaded');

    console.log('Loading DashboardService...');
    require('./services/adminService/DashboardService');
    console.log('✅ DashboardService loaded');

    console.log('Loading InscriptionAdminService...');
    require('./services/adminService/InscriptionAdminService');
    console.log('✅ InscriptionAdminService loaded');

    console.log('Loading UserServiceDashboard...');
    require('./services/adminService/UserServiceDashboard');
    console.log('✅ UserServiceDashboard loaded');

    console.log('🎉 All files loaded successfully!');
} catch (error) {
    console.error('❌ Error loading files:', error);
    process.exit(1);
}
