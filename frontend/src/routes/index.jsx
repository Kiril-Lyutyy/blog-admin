import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import UserProfilePage from '../pages/UserProfile';
import ManageUsersPage from '../pages/ManageUsers';
import PostDetailsPage from '../pages/PostDetails';
import EditPostPage from '../pages/EditPost';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import RequireAuth from '../components/RequireAuth';
import PageLayout from '../components/PageLayout';
// TODO mode to page
import CreatePostPage from '../components/ArticleForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <RequireAuth>
            <PageLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />

        {/* New Article requires 'edit_posts' permission */}
        <Route
          path="/articles/new"
          element={
            <RequireAuth permission="edit_posts">
              <CreatePostPage />
            </RequireAuth>
          }
        />

        {/* Edit Post requires 'edit_posts' permission */}
        <Route
          path="/posts/:id/edit"
          element={
            <RequireAuth permission="edit_posts">
              <EditPostPage />
            </RequireAuth>
          }
        />

        {/* Manage Users requires 'manage_users' permission */}
        <Route
          path="/manage-users"
          element={
            <RequireAuth permission="manage_users">
              <ManageUsersPage />
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
