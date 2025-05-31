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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useManageUsers from '../hooks/useManageUsers';
import { ROLE_OPTIONS } from '../constants/roles';
import { useState, useRef } from 'react';

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
    patchUser(id, { role_id: newRoleId })
      .then(() => {
        toast.success('User role updated successfully!');
      })
      .catch((err) => {
        toast.error(`Failed to update user role: ${err.message}`);
      });
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
        patchUser(id, { email: newEmail })
          .then(() => {
            toast.success('User email updated successfully!');
          })
          .catch((err) => {
            toast.error(`Failed to update user email: ${err.message}`);
          });
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
    toast.success('User deleted successfully!');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h3" mb={3}>
        Manage Users
      </Typography>

      <Table
        sx={{
          border: '2px solid #fff', // 8-bit red border
          borderBottom: '1px solid #fff', // 8-bit red border
          borderCollapse: 'separate',
          borderRadius: '2px', // optional, for rounded corners
          overflow: 'hidden', // ensures rounded corners work
          backgroundColor: '#20124d', // dark background
        }}
      >
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
                    sx={{ minWidth: 160 }}
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

      {/* Delete confirmation modal */}
      <Dialog open={deleteConfirm.open} onClose={closeDeleteConfirm}>
        <DialogTitle>
          <Typography variant="h5" gutterBottom>
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
