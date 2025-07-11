import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
