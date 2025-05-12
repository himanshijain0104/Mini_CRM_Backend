const db = require('../config/db');

const orderService = {
  // Get all orders
  getAllOrders: async () => {
    const [orders] = await db.query('SELECT * FROM orders');

    // Enrich orders with customer stats
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const [customer] = await db.query(
          'SELECT total_spend, visit_count FROM customers WHERE id = ?',
          [order.customer_id]
        );

        const newTotalSpend = customer[0]?.total_spend || 0;
        const newVisitCount = customer[0]?.visit_count || 0;

        return {
          ...order,
          newTotalSpend,
          newVisitCount,
        };
      })
    );

    return enrichedOrders;
  },

  createOrder: async (orderData) => {
    const { customer_id, order_date, amount, status } = orderData;
  
    // Insert order into the orders table
    const [orderResult] = await db.query(
      'INSERT INTO orders (customer_id, order_date, amount, status) VALUES (?, ?, ?, ?)',
      [customer_id, order_date, amount, status]
    );
  
    // Get the current total_spend and visit_count of the customer
    const [customer] = await db.query(
      'SELECT total_spend, visit_count FROM customers WHERE id = ?',
      [customer_id]
    );
  
    if (customer.length === 0) {
      throw new Error('Customer not found');
    }
  
    // Calculate new total_spend and visit_count
    const newTotalSpend = (parseFloat(customer[0].total_spend) + parseFloat(amount)).toFixed(2);
    const newVisitCount = customer[0].visit_count + 1;
  
    // Update the customer's total_spend and visit_count
    await db.query(
      'UPDATE customers SET total_spend = ?, visit_count = ?, last_visit_date = ? WHERE id = ?',
      [newTotalSpend, newVisitCount, order_date, customer_id]
    );
  
    // Return the new order data along with the updated customer info
    return { id: orderResult.insertId, ...orderData, customer_id, newTotalSpend, newVisitCount };
  }
  
};

module.exports = orderService;
