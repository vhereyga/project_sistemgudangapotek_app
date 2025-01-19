const db = require('../config/database');

const Medicine = {
    // Ambil semua data obat
    getAll: callback => {
        db.query('SELECT * FROM medicines', callback);
    },
    // Ambil data obat berdasarkan ID
    getById: (id, callback) => {
        db.query('SELECT * FROM medicines WHERE id = ?', [id], callback);
    },
    // Tambah data obat baru
    create: (medicine, callback) => {
        db.query('INSERT INTO medicines SET ?', medicine, callback);
    },
    // Update data obat berdasarkan ID
    update: (id, medicine, callback) => {
        db.query('UPDATE medicines SET ? WHERE id = ?', [medicine, id], callback);
    },
    // Hapus data obat berdasarkan ID
    delete: (id, callback) => {
        db.query('DELETE FROM medicines WHERE id = ?', [id], callback);
    }
};

module.exports = Medicine;
