import { jest } from '@jest/globals';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

const actualUserModel = await import('../../src/models/user.model.js');
const actualJwtUtil = await import('../../src/utils/jwt.js');
const actualAuthController = await import(
  '../../src/controllers/auth.controller.js'
);

jest.unstable_mockModule('../../src/models/user.model.js', () => ({
  ...actualUserModel,
  findUserIdByRefreshToken: jest.fn(),
  findUserById: jest.fn(),
  deleteRefreshToken: jest.fn(),
  saveRefreshToken: jest.fn(),
}));

jest.unstable_mockModule('../../src/utils/jwt.js', () => ({
  ...actualJwtUtil,
  generateToken: jest.fn(),
}));

jest.unstable_mockModule('../../src/controllers/auth.controller.js', () => ({
  ...actualAuthController,
  generateRefreshToken: jest.fn(),
}));

const userModel = await import('../../src/models/user.model.js');
const controller = await import('../../src/controllers/auth.controller.js');

describe('Auth Controller - refresh', () => {
  let req, res;

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it('should return 401 if no refresh token provided', async () => {
    await controller.refresh(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No refresh token' });
  });

  it('should return 401 and clear cookie if refresh token invalid', async () => {
    const fakeToken = 'fake-refresh-token';
    req.cookies.refreshToken = fakeToken;
    userModel.findUserIdByRefreshToken.mockResolvedValue(null);

    await controller.refresh(req, res);

    expect(console.warn).toHaveBeenCalledWith(
      `Stolen or reused refresh token: ${fakeToken}`,
    );
    expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid refresh token' });
  });

  it('should return 401 if user not found', async () => {
    const fakeToken = 'valid-refresh-token';
    req.cookies.refreshToken = fakeToken;
    userModel.findUserIdByRefreshToken.mockResolvedValue(123);
    userModel.findUserById.mockResolvedValue(null);

    await controller.refresh(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid refresh token' });
  });

  it('should return 500 on unexpected error', async () => {
    req.cookies.refreshToken = 'some-token';
    userModel.findUserIdByRefreshToken.mockRejectedValue(
      new Error('DB failure'),
    );

    await controller.refresh(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid refresh token' });
  });
});

afterAll(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
});
