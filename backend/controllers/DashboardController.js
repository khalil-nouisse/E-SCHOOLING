const service = require('../services/adminService/DashboardService');

exports.stats = async (req, res) => {
  const data = await service.getDashboardStats();
  res.json(data);
};


