import { Box,Typography } from '@mui/material';

import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h3" mb={3}>
        User Profile
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Role: {user.role}</Typography>
    </Box>
  );
};

export default UserProfile;
