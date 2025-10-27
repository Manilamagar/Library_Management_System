<<<<<<< HEAD
// authController.js
// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/userModels.js'); // Ensure this is correct
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Debugging - log incoming request body
    console.log('Register request body:', req.body);

    // Check if all necessary fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    // Hash password before saving
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hash, role });

    // Return response with user data
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error to console for debugging
    res.status(500).json({ message: err.message });
  }
const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.register = async (req, res) => {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
try {
const exists = await Admin.findOne({ where: { username } });
if (exists) return res.status(400).json({ message: 'Username already exists' });
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
const admin = await Admin.create({ username, password: hash });
return res.status(201).json({ admin_id: admin.admin_id, username: admin.username });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
console.log(email,password)
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
try {
const admin = await Admin.findOne({ where: { username } });
if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
const match = await bcrypt.compare(password, admin.password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ admin_id: admin.admin_id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
return res.json({ token });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};