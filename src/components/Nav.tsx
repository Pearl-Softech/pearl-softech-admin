import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Nav() {
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove JWT from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Navbar className="background-color justify-content-between p-3">
      <Col xs="auto">
        <Link style={{ color: "black", textDecoration: "none" }} to={"/"} className="logo text-bold fw-bold">
          Pearl Softech - Admin
        </Link>
      </Col>
      <Col xs="auto">
        <Button onClick={handleLogout} type="button">Logout</Button> {/* Logout button */}
      </Col>
    </Navbar>
  );
}

export default Nav;
