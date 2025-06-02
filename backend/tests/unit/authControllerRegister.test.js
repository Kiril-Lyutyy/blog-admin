import { jest } from '@jest/globals';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const actualUserModel = await import('../../src/models/user.model.js');

jest.unstable_mockModule('../../src/models/user.model.js', () => ({
  ...actualUserModel,
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

const userModel = await import('../../src/models/user.model.js');
const { register } = await import('../../src/controllers/auth.controller.js');

describe('Auth Controller - register', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: 'secret' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return 409 if user already exists', async () => {
    userModel.findUserByEmail.mockResolvedValue({ id: 1 });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should create user and return 201', async () => {
    userModel.findUserByEmail.mockResolvedValue(null);
    userModel.createUser.mockResolvedValue();

    await register(req, res);

    expect(userModel.createUser).toHaveBeenCalledWith(
      'test@example.com',
      'secret',
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered' });
  });

  it('should return 500 on error', async () => {
    userModel.findUserByEmail.mockRejectedValue(new Error('DB error'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Registration error' });
  });
});

afterAll(() => {
  console.error.mockRestore();
});
