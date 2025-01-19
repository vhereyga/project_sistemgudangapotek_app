const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const stockOutRoutes = require('./routes/stockOutRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Hanya izinkan permintaan dari frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Izinkan metode tertentu
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
}));

app.use(bodyParser.json());

// Routes
app.use('/orders', orderRoutes);
app.use('/order-details', orderDetailRoutes);
app.use('/stock-out', stockOutRoutes);
app.use('/medicines', medicineRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
