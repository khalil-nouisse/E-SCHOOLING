// modules/user/user.controller.js
const userService = require('../../services/admin/user.service');

// Lister tous les utilisateurs
exports.listUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// Modifier un utilisateur
exports.editUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Supprimer un utilisateur
exports.removeUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
