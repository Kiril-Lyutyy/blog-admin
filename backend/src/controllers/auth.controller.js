const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
};

exports.profile = async (req, res) => {
  res.json({ message: 'Secure profile data', user: req.user });
};
