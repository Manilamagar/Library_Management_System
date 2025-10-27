// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure: true in production
    res.json({ msg: 'Logged in', role: user.role });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logged out' });
});

module.exports = router;