const db = require('../config/db');

const customerService = {
  // Get all customers
  getAllCustomers: async () => {
    const [rows] = await db.query('SELECT * FROM customers');
    return rows;
  },

  //GET customers id and name
  getCustomerIdName: async () => {
    const [rows] = await db.query('SELECT id, name FROM customers');
    return rows;
  },
  
  //POST a new customer
  createCustomer: async (customerData) => {
    const { name, email, phone, total_spend, visit_count, last_visit_date } = customerData;
    const [result] = await db.query(
      'INSERT INTO customers (name, email, phone, total_spend, visit_count, last_visit_date) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, total_spend, visit_count, last_visit_date]
    );
    return { id: result.insertId, ...customerData };
  },

  //GET customers count
  getCustomerCount: async () => {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM customers');
    return rows[0].count;
  },

};

module.exports = customerService;
