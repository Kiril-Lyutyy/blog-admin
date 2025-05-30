// components/PageLayout.js
import React from 'react';
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user && <Navbar user={user} onLogout={logout} />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;
