import { Box, MenuItem, Select, TextField } from '@mui/material';

import { ROLE_OPTIONS } from '../../constants/roles';

const UserFilters = ({
  searchInput,
  onSearchChange,
  roleFilter,
  onRoleChange,
}) => (
  <Box display="flex" gap={2} mb={2}>
    <TextField
      label="Search Email"
      variant="outlined"
      size="small"
      value={searchInput}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <Select
      displayEmpty
      size="small"
      value={roleFilter}
      onChange={(e) => onRoleChange(e.target.value)}
    >
      <MenuItem value="">All Roles</MenuItem>
      {ROLE_OPTIONS.map((role) => (
        <MenuItem key={role.id} value={role.id}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

export default UserFilters;
