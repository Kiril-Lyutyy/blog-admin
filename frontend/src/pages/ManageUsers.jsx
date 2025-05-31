import { toast } from 'react-toastify';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useManageUsers from '../hooks/useManageUsers';
import { ROLE_OPTIONS } from '../constants/roles';
import { useState, useRef, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

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
    // Add roleFilter to control Select value
    roleFilter,
  } = useManageUsers();

  const [editableUsers, setEditableUsers] = useState({});
  const debounceTimers = useRef({});

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    userId: null,
  });

  // Local state for controlled search input
  const [searchInput, setSearchInput] = useState('');

  // Debounced call to setSearch (from hook)
  const debouncedSetSearch = useMemo(
    () => debounce(setSearch, 1000),
    [setSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
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
    setEditableUsers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        email: newEmail,
        error: !newEmail
          ? 'Email cannot be empty'
          : !emailRegex.test(newEmail)
            ? 'Invalid email format'
            : '',
      },
    }));

    if (debounceTimers.current[id]) clearTimeout(debounceTimers.current[id]);

    debounceTimers.current[id] = setTimeout(() => {
      const emailError = !newEmail
        ? 'Email cannot be empty'
        : !emailRegex.test(newEmail)
          ? 'Invalid email format'
          : '';

      if (!emailError) {
        patchUser(id, { email: newEmail })
          .then(() => toast.success('User email updated successfully!'))
          .catch((err) =>
            toast.error(`Failed to update user email: ${err.message}`),
          );
      }
    }, 1000);
  };

  const openDeleteConfirm = (userId) => {
    setDeleteConfirm({ open: true, userId });
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, userId: null });
  };
  const confirmDelete = () => {
    deleteUser(deleteConfirm.userId);
    closeDeleteConfirm();
    toast.success('User deleted successfully!');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h3" mb={3}>
        Manage Users
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search Email"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <Select
          displayEmpty
          size="small"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <MenuItem value="">All Roles</MenuItem>
          {ROLE_OPTIONS.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => {
            const userEdit = editableUsers[user.id] || {};
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    value={userEdit.email ?? user.email}
                    error={Boolean(userEdit.error)}
                    helperText={userEdit.error}
                    onChange={(e) => handleEmailChange(user.id, e.target.value)}
                  />
                </TableCell>

                <TableCell>
                  <Select
                    value={user.role_id}
                    size="small"
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>

                <TableCell>
                  <Button
                    endIcon={<DeleteIcon />}
                    onClick={() => openDeleteConfirm(user.id)}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
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

      {/* Delete Modal */}
      <Dialog open={deleteConfirm.open} onClose={closeDeleteConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
