import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const PageLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default PageLayout;
