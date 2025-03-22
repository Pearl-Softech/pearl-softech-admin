import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JWTPolice = () => {
  const token = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Hook for navigating

  useEffect(() => {
    // If the token is not found and the user is not on the login page, redirect them to the login page
    if (!token && location.pathname !== '/login') {
      navigate('/login'); // Use navigate to redirect
    }
  }, [token, location.pathname, navigate]); // Dependencies to re-run the effect if needed

  // If the token is found or the user is on the login page, do nothing
  return null;
};

export default JWTPolice;
