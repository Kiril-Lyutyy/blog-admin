import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import { Stack, Typography } from '@mui/material';
import { register as registerUser } from '../api/authApi';
import AuthFormWrapper from '../components/Auth/AuthFormWrapper';
import AuthTextField from '../components/Auth/AuthTextField';
import SubmitButton from '../components/Auth/SubmitButton';
import { emailRules, passwordRules } from '../components/Auth/utils';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');

    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed';

      setError(message);
    }
  };

  return (
    <AuthFormWrapper
      title="Register"
      error={error}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <AuthTextField
          label="Email"
          name="email"
          register={register}
          rules={emailRules}
          error={errors.email}
        />
        <AuthTextField
          label="Password"
          name="password"
          type="password"
          register={register}
          rules={passwordRules}
          error={errors.password}
        />
        <SubmitButton loading={isSubmitting}>Register</SubmitButton>
        <Typography fontSize={12} align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Stack>
    </AuthFormWrapper>
  );
};

export default RegisterForm;
