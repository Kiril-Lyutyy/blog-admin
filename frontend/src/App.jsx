import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import UserProfile from './pages/UserProfile';
import ArticleForm from './components/ArticleForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import useAuth from './hooks/useAuth';

const App = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {user.role === 'admin' && (
          <Route path="/manage-users" element={<ManageUsers />} />
        )}
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
