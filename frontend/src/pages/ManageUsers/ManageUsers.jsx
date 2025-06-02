import {
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useManageUsers from '../../hooks/useManageUsers';
import DeleteDialog from './DeleteDialog';
import UserFilters from './UserFilters';
import UserRow from './UserRow';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ManageUsers = () => {
  const {
    users,
    loading,
    error,
    meta,
    patchUser,
    deleteUser,
    setPage,
    setSearch,
    setRoleFilter,
    roleFilter,
  } = useManageUsers();

  const [editableUsers, setEditableUsers] = useState({});
  const debounceTimers = useRef({});

  const [searchInput, setSearchInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    userId: null,
  });

  const debouncedSetSearch = useMemo(
    () => debounce(setSearch, 1000),
    [setSearch],
  );

  useEffect(() => {
    return () => debouncedSetSearch.cancel();
  }, [debouncedSetSearch]);

  const handleSearchChange = (val) => {
    setSearchInput(val);
    debouncedSetSearch(val);
  };

  const handleRoleChange = (id, newRoleId) => {
    patchUser(id, { role_id: newRoleId })
      .then(() => toast.success('User role updated successfully!'))
      .catch((err) =>
        toast.error(`Failed to update user role: ${err.message}`),
      );
  };

  const handleEmailChange = (id, newEmail) => {
    const emailError = !newEmail
      ? 'Email cannot be empty'
      : !emailRegex.test(newEmail)
        ? 'Invalid email format'
        : '';

    setEditableUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], email: newEmail, error: emailError },
    }));

    clearTimeout(debounceTimers.current[id]);

    debounceTimers.current[id] = setTimeout(() => {
      if (!emailError) {
        patchUser(id, { email: newEmail })
          .then(() => toast.success('User email updated successfully!'))
          .catch((err) =>
            toast.error(`Failed to update user email: ${err.message}`),
          );
      }
    }, 1000);
  };

  const openDeleteConfirm = (userId) =>
    setDeleteConfirm({ open: true, userId });
  const closeDeleteConfirm = () =>
    setDeleteConfirm({ open: false, userId: null });
  const confirmDelete = () => {
    deleteUser(deleteConfirm.userId);
    toast.success('User deleted successfully!');
    closeDeleteConfirm();
  };

  if (loading) {return <CircularProgress />;}
  if (error) {return <Alert severity="error">{error}</Alert>;}

  return (
    <div>
      <Typography variant="h3" mb={3}>
        Manage Users
      </Typography>

      <UserFilters
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              editableData={editableUsers[user.id]}
              onEmailChange={handleEmailChange}
              onRoleChange={handleRoleChange}
              onDelete={openDeleteConfirm}
            />
          ))}
        </TableBody>
      </Table>

      {meta && (
        <TablePagination
          component="div"
          count={meta.total}
          page={meta.page - 1}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          rowsPerPage={meta.limit}
          rowsPerPageOptions={[meta.limit]}
        />
      )}

      <DeleteDialog
        open={deleteConfirm.open}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ManageUsers;
