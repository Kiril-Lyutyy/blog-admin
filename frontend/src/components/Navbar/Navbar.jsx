import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LogoIcon from '../../components/LogoIcon';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';
import StyledNavButton from './NavButton';
import { StyledAppBar, StyledToolbar, TitleText } from './styles';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('You have been logged out!');
    navigate('/login', { replace: true });
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <TitleText variant="h2" component="div">
            Black Cat's Blog
          </TitleText>
          <Box sx={{ width: '60px' }}>
            <LogoIcon />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <StyledNavButton icon={<ForumIcon />} to="/" text="Blog" />
          {hasPermission(user, 'edit_posts') && (
            <StyledNavButton
              icon={<PostAddIcon />}
              to="/articles/new"
              text="Create Post"
            />
          )}
          {hasPermission(user, 'manage_users') && (
            <StyledNavButton
              icon={<PeopleIcon />}
              to="/manage-users"
              text="Manage Users"
            />
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
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
