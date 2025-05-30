import { Typography, Box } from '@mui/material';
import useAuth from '../hooks/useAuth';

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
      {/* Later add update profile form here */}
    </Box>
  );
};

export default UserProfile;
