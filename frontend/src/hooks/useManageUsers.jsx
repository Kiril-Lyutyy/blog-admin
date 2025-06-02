import { useEffect, useState } from 'react';

import {
  createUser,
  deleteUser,
  getUsers,
  patchUser,
  updateUser,
} from '../api/manageUsersApi';

const useManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, search };
      if (roleFilter) {
        params.role_id = roleFilter;
      }

      const response = await getUsers(params);
      setUsers(response.data.data);
      setMeta(response.data.meta);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const handleCreate = async (data) => {
    try {
      await createUser(data);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateUser(id, data);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handlePatchUser = async (id, updates) => {
    try {
      await patchUser(id, updates);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return {
    users,
    meta,
    loading,
    error,
    setPage,
    setSearch,
    setRoleFilter,
    createUser: handleCreate,
    updateUser: handleUpdate,
    deleteUser: handleDelete,
    patchUser: handlePatchUser,
    roleFilter,
  };
};

export default useManageUsers;
