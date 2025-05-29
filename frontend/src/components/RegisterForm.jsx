import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import api from '../client';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/register', data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Register
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        })}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Register
      </Button>

      <Typography variant="body2" align="center">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
