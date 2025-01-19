const db = require('../config/database');

const OrderDetail = {
    getAll: callback => db.query('SELECT * FROM order_details', callback),
    getById: (id, callback) => db.query('SELECT * FROM order_details WHERE id = ?', [id], callback),
    create: (orderDetail, callback) => db.query('INSERT INTO order_details SET ?', orderDetail, callback),
    update: (id, orderDetail, callback) => db.query('UPDATE order_details SET ? WHERE id = ?', [orderDetail, id], callback),
    delete: (id, callback) => db.query('DELETE FROM order_details WHERE id = ?', [id], callback)
};

module.exports = OrderDetail;
