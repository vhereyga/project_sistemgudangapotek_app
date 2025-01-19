const OrderDetail = require('../models/OrderDetail');

exports.getAllOrderDetails = (req, res) => {
    OrderDetail.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getOrderDetailById = (req, res) => {
    OrderDetail.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.createOrderDetail = (req, res) => {
    OrderDetail.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Order detail created', id: result.insertId });
    });
};

exports.updateOrderDetail = (req, res) => {
    OrderDetail.update(req.params.id, req.body, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order detail updated' });
    });
};

exports.deleteOrderDetail = (req, res) => {
    OrderDetail.delete(req.params.id, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order detail deleted' });
    });
};
