const Order = require('../models/order');

exports.getAllOrders = (req, res) => {
    Order.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getOrderById = (req, res) => {
    Order.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.createOrder = (req, res) => {
    Order.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Order created', id: result.insertId });
    });
};

exports.updateOrder = (req, res) => {
    Order.update(req.params.id, req.body, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order updated' });
    });
};

exports.deleteOrder = (req, res) => {
    Order.delete(req.params.id, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order deleted' });
    });
};
