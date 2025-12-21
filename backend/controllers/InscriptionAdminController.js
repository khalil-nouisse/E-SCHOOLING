// inscription.controller.js
const service = require('../services/adminService/InscriptionAdminService');

exports.list = async (req, res) => {
  const data = await service.getAllInscriptions();
  res.json(data);
};

exports.details = async (req, res) => {
  const id = Number(req.params.id);
  const data = await service.getInscriptionById(id);
  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const { status, agentId, rejectionComment } = req.body;
  const id = Number(req.params.id);

  const result = await service.updateInscriptionStatus(
    id,
    status,
    agentId,
    rejectionComment
  );

  res.json(result);
};

exports.downlaodDocument = async (req, res) => {
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
  const data = await service.getRecentApplications(req.query.limit || 5 );
  res.json(data);
};
