const express = require('express');
const router = express.Router();
const orderService = require('../services/OrderService');
const verifyToken = require('../middleware/verifyToken');

// GET all orders
router.get('/orders', verifyToken, async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// POST new order
router.post('/orders', verifyToken, async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating order' });
  }
});




module.exports = router;
