// backend/routes/users.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

router.use(protect);
router.use(authorize('Admin'));

router.get('/', async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});

// Add CRUD for users similarly (create, update, delete)

module.exports = router;