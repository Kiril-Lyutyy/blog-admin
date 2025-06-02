// Navbar/styles.js
import { AppBar, Button,Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: '#4c1130',
  borderBottom: '4px solid #FF3C00',
  fontFamily: '\'Press Start 2P\', cursive',
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const TitleText = styled(Typography)(() => ({
  color: '#00E0FF',
  fontSize: 16,
  marginRight: 16,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: '#FFD700',
  fontFamily: '\'Press Start 2P\', cursive',
  fontSize: 12,
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: '#2B2B2B',
    color: '#FAEC54',
  },
}));
