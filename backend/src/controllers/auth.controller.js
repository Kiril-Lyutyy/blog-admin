import { v4 as uuidv4 } from 'uuid';

import { getPermissionsByRoleId } from '../models/permission.model.js';
import {
  comparePasswords,
  createUser,
  deleteRefreshToken,
  findUserByEmail,
  findUserById,
  findUserByIdWithRole,
  findUserIdByRefreshToken,
  saveRefreshToken,
} from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const generateRefreshToken = async () => {
  return uuidv4();
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

    const permissions = await getPermissionsByRoleId(user.role_id);
    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      permissions,
    });
    const refreshToken = await generateRefreshToken();

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
    console.warn(`Stolen or reused refresh token: ${refreshToken}`);
    res.clearCookie('refreshToken');
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await findUserById(userId);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  await deleteRefreshToken(refreshToken);

  const newAccessToken = generateToken({ id: user.id, email: user.email });
  const newRefreshToken = await generateRefreshToken();
  await saveRefreshToken(newRefreshToken, user.id);

  res
    .cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ token: newAccessToken });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await deleteRefreshToken(refreshToken);
  }

  res.clearCookie('refreshToken').json({ message: 'Logged out successfully' });
};

export const me = async (req, res) => {
  try {
    const user = await findUserByIdWithRole(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const permissions = await getPermissionsByRoleId(user.role_id);

    res.json({
      id: user.id,
      email: user.email,
      role: user.role_name,
      permissions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user info' });
  }
};
