import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoIcon from '../components/LogoIcon';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

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
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h2" component="div" sx={{ marginRight: 1 }}>
            Black Cat's Blog
          </Typography>

          <Box sx={{ width: '60px' }}>
            <LogoIcon />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Typography color="#38761d">•</Typography>

          {hasPermission('edit_posts') && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/articles/new"
                startIcon={<PostAddIcon />}
              >
                New Article
              </Button>
              <Typography color="#38761d">•</Typography>
            </>
          )}

          {hasPermission('manage_users') && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/manage-users"
                startIcon={<PeopleIcon />}
              >
                Manage Users
              </Button>
              <Typography color="#38761d">•</Typography>
            </>
          )}

          <Button
            color="inherit"
            component={Link}
            to="/profile"
            startIcon={<AccountCircleIcon />}
          >
            Profile
          </Button>
          <Typography color="#38761d">•</Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
