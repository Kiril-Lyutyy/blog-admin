import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';

import { login } from '../api/authApi';
import AuthFormWrapper from '../components/Auth/AuthFormWrapper';
import AuthTextField from '../components/Auth/AuthTextField';
import SubmitButton from '../components/Auth/SubmitButton';
import { emailRules, passwordRules } from '../components/Auth/utils';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');

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
    <AuthFormWrapper
      title="Login"
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
          autocomplete="current-password"
          register={register}
          rules={passwordRules}
          error={errors.password}
        />
        <SubmitButton loading={isSubmitting}>Login</SubmitButton>
        <Typography fontSize={12} align="center">
          Do not have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Stack>
    </AuthFormWrapper>
  );
}
