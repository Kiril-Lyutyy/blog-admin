import { jest } from '@jest/globals';

const actualUserModel = await import('../../src/models/user.model.js');
const mockDeleteRefreshToken = jest.fn();

jest.unstable_mockModule('../../src/models/user.model.js', () => ({
  ...actualUserModel,
  deleteRefreshToken: mockDeleteRefreshToken,
}));

const { logout } = await import('../../src/controllers/auth.controller.js');

describe('Auth Controller - logout', () => {
  let req, res;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      clearCookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should delete the refresh token if present and clear the cookie', async () => {
    const token = 'refresh-token-example';
    req.cookies.refreshToken = token;

    mockDeleteRefreshToken.mockResolvedValue();

    await logout(req, res);

    expect(mockDeleteRefreshToken).toHaveBeenCalledWith(token);
    expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logged out successfully',
    });
  });

  it('should skip deletion and just clear the cookie if no refresh token present', async () => {
    await logout(req, res);

    expect(mockDeleteRefreshToken).not.toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logged out successfully',
    });
  });
});
