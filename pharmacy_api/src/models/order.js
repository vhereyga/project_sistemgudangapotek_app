const db = require('../config/database');

const Order = {
    getAll: callback => db.query('SELECT * FROM orders', callback),
    getById: (id, callback) => db.query('SELECT * FROM orders WHERE id = ?', [id], callback),
    create: (order, callback) => db.query('INSERT INTO orders SET ?', order, callback),
    update: (id, order, callback) => db.query('UPDATE orders SET ? WHERE id = ?', [order, id], callback),
    delete: (id, callback) => db.query('DELETE FROM orders WHERE id = ?', [id], callback)
};

module.exports = Order;
