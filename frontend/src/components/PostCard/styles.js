import { Box, styled, Typography } from '@mui/material';

export const PostBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: '#2E2E2E',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  border: '1px solid #555',
}));

export const PostTitle = styled(Typography)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));

export const PostMeta = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: 9,
  color: theme.palette.text.secondary,
}));

export const PostPreview = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: 11,
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));
