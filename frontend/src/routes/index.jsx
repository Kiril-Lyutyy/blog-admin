import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';
import ArticleForm from '../components/ArticleForm';
import ManageUsers from '../pages/ManageUsers';
import RequireAuth from '../components/RequireAuth';
import PageLayout from '../components/PageLayout';
import PostDetails from '../pages/PostDetails';

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
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* New Article requires 'edit_posts' permission */}
        <Route
          path="/articles/new"
          element={
            <RequireAuth permission="edit_posts">
              <ArticleForm />
            </RequireAuth>
          }
        />

        {/* Manage Users requires 'manage_users' permission */}
        <Route
          path="/manage-users"
          element={
            <RequireAuth permission="manage_users">
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
