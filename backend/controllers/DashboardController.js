const service = require('../services/adminService/DashboardService');

exports.stats = async (req, res) => {
  try {
    const data = await service.getDashboardStats();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


