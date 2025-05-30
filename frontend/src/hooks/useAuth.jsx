import { useEffect, useState } from 'react';
import { getProfile } from '../api/authApi';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getProfile();
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loginUser = async (token) => {
    localStorage.setItem('token', token);
    await loadUser();
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, loginUser, logout };
};

export default useAuth;
