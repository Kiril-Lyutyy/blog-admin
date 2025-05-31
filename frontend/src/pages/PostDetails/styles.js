import { Box, Typography, Button, styled } from '@mui/material';

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
  cursor: 'default',
}));

export const PostMeta = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: 9,
  color: theme.palette.text.secondary,
}));

export const PostContent = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-line',
  fontSize: 11,
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
