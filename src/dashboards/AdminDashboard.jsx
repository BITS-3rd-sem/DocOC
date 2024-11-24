import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/AuthContext';
import DoctorList from '../components/DoctorList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/signin');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <DoctorList />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default AdminDashboard;