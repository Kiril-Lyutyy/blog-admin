import React from 'react';
import { Typography, Box } from '@mui/material';

const UserProfile = ({ user }) => {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        User Profile
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Role: {user.role}</Typography>
      {/* Later add update profile form here */}
    </Box>
  );
};

export default UserProfile;
