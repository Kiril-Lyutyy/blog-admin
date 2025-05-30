// routes/index.js
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';
import ArticleForm from '../components/ArticleForm';
import ManageUsers from '../pages/ManageUsers';
import RequireAuth from '../components/RequireAuth';
import PageLayout from '../components/PageLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <RequireAuth>
            <PageLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route
          path="/manage-users"
          element={
            <RequireAuth>
              <ManageUsers />
            </RequireAuth>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
