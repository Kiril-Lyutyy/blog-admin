import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useManageUsers from '../hooks/useManageUsers';
import { ROLE_OPTIONS } from '../constants/roles';
import { useState, useEffect, useRef } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ManageUsers = () => {
  const { users, loading, error, deleteUser, patchUser } = useManageUsers();

  // State for email inputs, validation and debounce
  const [editableUsers, setEditableUsers] = useState({});
  const debounceTimers = useRef({});

  // State for delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    userId: null,
  });

  // Handle Role change (immediate update)
  const handleRoleChange = (id, newRoleId) => {
    patchUser(id, { role_id: newRoleId });
  };

  // Handle email input change, update state, debounce API call
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

    // Clear any existing debounce timer for this user
    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
    }

    // Setup debounce timer to call patchUser 1s after last input
    debounceTimers.current[id] = setTimeout(() => {
      const emailError = !newEmail
        ? 'Email cannot be empty'
        : !emailRegex.test(newEmail)
          ? 'Invalid email format'
          : '';

      if (!emailError) {
        patchUser(id, { email: newEmail });
      }
    }, 1000);
  };

  // Delete confirmation modal handlers
  const openDeleteConfirm = (userId) => {
    setDeleteConfirm({ open: true, userId });
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, userId: null });
  };
  const confirmDelete = () => {
    deleteUser(deleteConfirm.userId);
    closeDeleteConfirm();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h3" mb={3}>
        Manage Users
      </Typography>

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
                    color="primary"
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

      {/* Delete confirmation modal */}
      <Dialog open={deleteConfirm.open} onClose={closeDeleteConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
