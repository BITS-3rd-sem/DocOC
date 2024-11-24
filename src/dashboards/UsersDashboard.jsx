import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/AuthContext';

import { useEffect, useState } from 'react';
import UsersService  from '../helpers/http/UserService';

const UsersDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UsersService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate('/signin');
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome to the User dashboard!</p>
      <Button onClick={handleLogout}>Logout</Button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersDashboard;