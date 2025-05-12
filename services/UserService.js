const db = require('../config/db');
const { get } = require('../routes/CampaignRoute');

const userService = {
  // Get all users
  getAllUsers: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },
  // GET user by email
  getUserByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  // Create a new user
  createUser: async (userData) => {
    const { google_id, email, name } = userData;
    const [result] = await db.query(
      'INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)',
      [google_id, email, name]
    );
    return { id: result.insertId, ...userData };
  }
};

module.exports = userService;
