const Medicine = require('../models/Medicine');

// Ambil semua data obat
exports.getAllMedicines = (req, res) => {
    Medicine.getAll((err, results) => {
      if (err) {
        console.error("Database error:", err); // Log error
        return res.status(500).json({ error: err.message });
      }
      console.log(results); // Log hasil query
      res.json(results);
    });
  };
  

// Ambil data obat berdasarkan ID
exports.getMedicineById = (req, res) => {
    Medicine.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Medicine not found' });
        res.json(result[0]);
    });
};

// Tambah data obat baru
exports.createMedicine = (req, res) => {
    const { nama, jenis, jumlah } = req.body;

    // Validasi input
    if (!nama || !jenis || jumlah == null || jumlah < 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    Medicine.create({ nama, jenis, jumlah }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Medicine created', id: result.insertId });
    });
};

// Update data obat berdasarkan ID
exports.updateMedicine = (req, res) => {
    const { nama, jenis, jumlah } = req.body;

    // Validasi input
    if (!nama || !jenis || jumlah == null || jumlah < 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    Medicine.update(req.params.id, { nama, jenis, jumlah }, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Medicine updated' });
    });
};

// Hapus data obat berdasarkan ID
exports.deleteMedicine = (req, res) => {
    Medicine.delete(req.params.id, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Medicine deleted' });
    });
};
