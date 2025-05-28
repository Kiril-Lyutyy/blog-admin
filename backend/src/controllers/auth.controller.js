import crypto from 'node:crypto';
import {
  findUserByEmail,
  createUser,
  comparePasswords,
  findUserById,
  saveRefreshToken,
} from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const generateRefreshToken = async () => {
  return crypto.randomBytes(40).toString('hex');
};

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

    const accessToken = generateToken({ id: user.id, email: user.email });
    const refreshToken = await generateRefreshToken(); // <-- добавляем это

    await saveRefreshToken(refreshToken, user.id);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ token: accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login error' });
  }
};

export const profile = async (req, res) => {
  res.json({ message: 'Secure profile data', user: req.user });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  const userId = await findUserIdByRefreshToken(refreshToken);

  if (!userId) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await findUserById(userId);

  if (!user) return res.status(401).json({ message: 'User not found' });

  const newAccessToken = generateToken({ id: user.id, email: user.email });

  res.json({ token: newAccessToken });
};
