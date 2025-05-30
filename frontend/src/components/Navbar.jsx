// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Blog Admin
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {user?.role === 'admin' && (
          <Button color="inherit" component={Link} to="/manage-users">
            Manage Users
          </Button>
        )}

        <Button color="inherit" component={Link} to="/articles/new">
          New Article
        </Button>

        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
