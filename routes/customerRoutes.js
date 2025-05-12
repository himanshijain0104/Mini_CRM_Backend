const express = require('express');
const customerService = require('../services/customerService');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Get all customers
router.get('/customers',verifyToken, async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

// Create a new customer
router.post('/customers', verifyToken, async (req, res) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Error creating customer' });
  }
});

// GET customers count
router.get('/count', async (req, res) => {
  try {
    const count = await customerService.getCustomerCount();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching customer count' });
  }
});


// In my Express server
router.get('/customers/idname', async (req, res) => {
  try {
   const rows = await customerService.getCustomerIdName();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
