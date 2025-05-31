import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoIcon from '../components/LogoIcon';

import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';

const StyledNavButton = ({ to, onClick, icon, text }) => (
  <Button
    component={to ? Link : 'button'}
    to={to}
    onClick={onClick}
    startIcon={icon}
    sx={{
      color: '#FFD700', // pixel gold
      fontFamily: '\'Press Start 2P\', cursive',
      fontSize: 12,
      padding: '8px 12px',
      '&:hover': {
        bgcolor: '#2B2B2B',
        color: '#FAEC54', // soft yellow glow
      },
    }}
  >
    {text}
  </Button>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // TODO: move to utils
  const hasPermission = (perm) => user?.permissions?.includes(perm);

  return (
    <AppBar
      position="static"
      sx={{
        mb: 3,
        bgcolor: '#4c1130',
        borderBottom: '4px solid #FF3C00',
        fontFamily: '\'Press Start 2P\', cursive',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h2"
            component="div"
            sx={{
              color: '#00E0FF', // neon cyan
              fontSize: 16,
              mr: 2,
            }}
          >
            Black Cat's Blog
          </Typography>

          <Box sx={{ width: '60px' }}>
            <LogoIcon />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <StyledNavButton icon={<ForumIcon />} to="/" text="Blog" />
          {hasPermission('edit_posts') && (
            <>
              <StyledNavButton
                icon={<PostAddIcon />}
                to="/articles/new"
                text="Create Post"
              />
            </>
          )}
          {hasPermission('manage_users') && (
            <>
              <StyledNavButton
                icon={<PeopleIcon />}
                to="/manage-users"
                text="Manage Users"
              />
            </>
          )}
          <StyledNavButton
            icon={<AccountCircleIcon />}
            to="/profile"
            text="Profile"
          />
          <StyledNavButton
            icon={<LogoutIcon />}
            onClick={handleLogout}
            text="Logout"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
