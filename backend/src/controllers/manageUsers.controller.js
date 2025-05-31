import {
  findUserById,
  insertUser,
  updateUserById,
  deleteUserById,
  patchUserById,
  findUsersWithFilters,
} from '../models/manageUsers.model.js';

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role_id } = req.query;

    const { users, total } = await findUsersWithFilters({
      page: Number(page),
      limit: Number(limit),
      search,
      role_id: role_id ? Number(role_id) : null,
    });

    res.json({
      data: users,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
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

export const patchUser = async (req, res) => {
  const { id } = req.params;
  const { email, role_id } = req.body;

  const fields = {};
  if (typeof email === 'string') fields.email = email;
  if (typeof role_id === 'number') fields.role_id = role_id;

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }

  try {
    const updated = await patchUserById(id, fields);
    if (!updated) {
      return res
        .status(404)
        .json({ message: 'User not found or no changes made' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};
