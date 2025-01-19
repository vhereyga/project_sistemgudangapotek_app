const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Endpoint untuk mendapatkan semua data obat
router.get('/', medicineController.getAllMedicines);

// Endpoint untuk mendapatkan data obat berdasarkan ID
router.get('/:id', medicineController.getMedicineById);

// Endpoint untuk menambahkan obat baru
router.post('/', medicineController.createMedicine);

// Endpoint untuk memperbarui data obat berdasarkan ID
router.put('/:id', medicineController.updateMedicine);

// Endpoint untuk menghapus obat berdasarkan ID
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
