import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';

const PageLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user && <Navbar user={user} onLogout={logout} />}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default PageLayout;
