import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';

import { ROLE_OPTIONS } from '../../constants/roles';

const UserRow = ({
  user,
  editableData = {},
  onEmailChange,
  onRoleChange,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>
        <TextField
          size="small"
          variant="outlined"
          value={editableData.email ?? user.email}
          error={Boolean(editableData.error)}
          helperText={editableData.error}
          onChange={(e) => onEmailChange(user.id, e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Select
          value={user.role_id}
          size="small"
          onChange={(e) => onRoleChange(user.id, e.target.value)}
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
          onClick={() => onDelete(user.id)}
          variant="contained"
          color="secondary"
          size="small"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
