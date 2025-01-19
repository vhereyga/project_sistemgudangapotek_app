const express = require('express');
const router = express.Router();
const stockOutController = require('../controllers/stockOutController');

router.get('/', stockOutController.getAllStockOuts);
router.get('/:id', stockOutController.getStockOutById);
router.post('/', stockOutController.createStockOut);
router.put('/:id', stockOutController.updateStockOut);
router.delete('/:id', stockOutController.deleteStockOut);

module.exports = router;
