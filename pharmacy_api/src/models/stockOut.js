const db = require('../config/database');

const StockOut = {
    getAll: callback => db.query('SELECT * FROM stock_out', callback),
    getById: (id, callback) => db.query('SELECT * FROM stock_out WHERE id = ?', [id], callback),
    create: (stockOut, callback) => db.query('INSERT INTO stock_out SET ?', stockOut, callback),
    update: (id, stockOut, callback) => db.query('UPDATE stock_out SET ? WHERE id = ?', [stockOut, id], callback),
    delete: (id, callback) => db.query('DELETE FROM stock_out WHERE id = ?', [id], callback)
};

module.exports = StockOut;
