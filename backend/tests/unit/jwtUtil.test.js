import { generateToken, verifyToken } from '../../src/utils/jwt.js';

describe('JWT Utils', () => {
  const payload = { userId: 123 };

  test('generateToken returns a token string', () => {
    const token = generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('verifyToken decodes a valid token correctly', () => {
    const token = generateToken(payload);
    const decoded = verifyToken(token);

    expect(decoded.userId).toBe(payload.userId);
  });

  test('verifyToken throws error on invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow();
  });
});
