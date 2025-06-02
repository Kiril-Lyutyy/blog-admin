import { styled } from '@mui/material';

export const FormContainer = styled('form')(({ theme }) => ({
  backgroundColor: '#20124d',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

export const RegisterFormContainer = styled('form')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
