// inscription.controller.js
const service = require('../services/adminService/InscriptionAdminService');
const path = require('path');

exports.list = async (req, res) => {
  try {
    const data = await service.getAllInscriptions();
    res.json(data);
  } catch (error) {
    console.error('Error fetching inscriptions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.details = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await service.getInscriptionById(id);
    res.json(data);
  } catch (error) {
    console.error('Error fetching inscription details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, agentId, rejectionComment } = req.body;
    const id = Number(req.params.id);

    const result = await service.updateInscriptionStatus(
      id,
      status,
      agentId,
      rejectionComment
    );

    res.json(result);
  } catch (error) {
    console.error('Error updating inscription status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const { filePath, fileName } = req.query;

    if (!filePath) {
      return res.status(400).json({ message: 'filePath is required' });
    }

    const absolutePath = path.join(
      __dirname,
      '../documents',
      path.basename(filePath)
    );

    return res.download(absolutePath, fileName || path.basename(filePath));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Download failed' });
  }
};

exports.recentApplications = async (req, res) => {
  try {
    const data = await service.getRecentApplications(req.query.limit || 5);
    res.json(data);
  } catch (error) {
    console.error('Error fetching recent applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
