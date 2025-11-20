// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/UsersModels.js'); // Ensure this is correct
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    // const { name, email, password, role } = req.body;
    // return res.json({ msg: 'Reached here' });
    return res.status(400).json({ message: req.body });
    // if(!email){
    //   return res.status(400).json({ message: 'Email is required' });
    // }

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
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    console.log(email, password);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.logout = async (req, res) => {
  try {
    // Since JWT is stateless, we can't invalidate the token on the server side
    // The client needs to remove the token from their storage
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
