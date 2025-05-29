import useAuth from '../hooks/useAuth.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Permissions:</strong>
      </p>
      <ul>
        {user.permissions.map((perm) => (
          <li key={perm}>{perm}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
