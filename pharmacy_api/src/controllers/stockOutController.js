const StockOut = require('../models/StockOut');

exports.getAllStockOuts = (req, res) => {
    StockOut.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getStockOutById = (req, res) => {
    StockOut.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.createStockOut = (req, res) => {
    StockOut.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Stock out created', id: result.insertId });
    });
};

exports.updateStockOut = (req, res) => {
    StockOut.update(req.params.id, req.body, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Stock out updated' });
    });
};

exports.deleteStockOut = (req, res) => {
    StockOut.delete(req.params.id, err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Stock out deleted' });
    });
};
