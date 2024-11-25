import React from 'react';
import '../stylesheets/adminDashboard.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} DocOc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;