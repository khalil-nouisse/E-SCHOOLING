const router = require('express').Router();
const userController = require('../controllers/UserControllerDashboard');

//manage user by the admin

router.get('/', userController.listUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
