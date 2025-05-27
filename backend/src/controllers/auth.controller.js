import {
  findUserByEmail,
  createUser,
  comparePasswords,
} from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await findUserByEmail(email);

    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await createUser(email, password);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login error' });
  }
};

export const profile = async (req, res) => {
  res.json({ message: 'Secure profile data', user: req.user });
};
