const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const userService = require('../services/UserService');

// Redirect user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google will redirect back to this route after user consents
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  async (req, res) => {
    // Storing the data in database if email is not already present
    const existinguser = await userService.getUserByEmail(req.user.email);
    if (!existinguser){
        const user = await userService.createUser({google_id: req.user.google_id, email: req.user.email, name: req.user.name});
    }
    const token = jwt.sign({ id: req.user.id, email: req.user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Optionally set user info in another cookie (not HTTP-only if frontend needs access)
   
    res.cookie('user', JSON.stringify(req.user), {
      httpOnly: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Can also redirect to frontend with the token in URL if needed
    res.redirect('http://localhost:3000/home')
  }
);
router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
