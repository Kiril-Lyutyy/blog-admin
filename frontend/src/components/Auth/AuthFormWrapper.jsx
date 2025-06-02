import { Alert, Box, Typography } from '@mui/material';

const AuthFormWrapper = ({ title, error, children, onSubmit }) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    maxWidth={400}
    mx="auto"
    mt={8}
    p={4}
    borderRadius={2}
    boxShadow={3}
    sx={{ backgroundColor: '#20124d' }}
    noValidate
  >
    <Typography variant="h3" mb={3} align="center">
      {title}
    </Typography>

    {error && (
      <Alert severity="error" sx={{ mb: 4 }}>
        <Typography fontSize={12}>{error}</Typography>
      </Alert>
    )}

    {children}
  </Box>
);

export default AuthFormWrapper;
