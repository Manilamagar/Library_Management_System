const { User } = require('../Models/userModels.js');
const jwt = require("jsonwebtoken")

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id','name','email','role','createdAt']});
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id','name','email','role']});
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    await user.update(req.body);
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id }});
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
