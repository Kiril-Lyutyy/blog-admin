import {
  findAllUsers,
  findUserById,
  insertUser,
  updateUserById,
  deleteUserById,
} from '../models/manageUsers.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const createUser = async (req, res) => {
  const { email, password, role_id } = req.body;
  if (!email || !password || !role_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const id = await insertUser({ email, password, role_id });
    res.status(201).json({ id, email, role_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  const { email, password, role_id } = req.body;
  try {
    const updated = await updateUserById(req.params.id, {
      email,
      password,
      role_id,
    });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
