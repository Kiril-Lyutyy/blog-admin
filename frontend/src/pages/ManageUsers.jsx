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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useManageUsers from '../hooks/useManageUsers';

const ManageUsers = () => {
  const { users, loading, error, deleteUser } = useManageUsers();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h4" mb={3}>
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => deleteUser(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
