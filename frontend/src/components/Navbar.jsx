import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
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
