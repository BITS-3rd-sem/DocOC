import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/AuthContext';
import DoctorList from '../components/DoctorList';
import '../stylesheets/adminDashboard.css'; // Ensure this path is correct
import Footer from "../components/Footer.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/signin');
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand className="navbar-brand">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Button 
              variant="outline-danger" 
              onClick={handleLogout} 
              className="btn"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <DoctorList />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;