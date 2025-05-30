import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import { login } from '../api/authApi';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    setError('');

    try {
      const res = await login(data);
      await loginUser(res.data.token);
      navigate('/', { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      borderRadius={2}
      boxShadow={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant="h3" mb={3} align="center">
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          autoFocus
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          fullWidth
          size="large"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>

        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            Register here
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
