import React, { useState } from 'react';
import useAuth from './hooks/useAuth.jsx';
import LoginForm from './components/LoginForm.jsx';

const App = () => {
  const { user, loading } = useAuth();
  const [trigger, setTrigger] = useState(0);

  const handleLogin = () => setTrigger((prev) => prev + 1);

  if (loading && !user) return <p>Loading...</p>;

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Role: {user.role}</p>
      <p>Permissions:</p>
      <ul>
        {user.permissions.map((perm) => (
          <li key={perm}>{perm}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
