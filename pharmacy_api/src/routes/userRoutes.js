const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User management routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
