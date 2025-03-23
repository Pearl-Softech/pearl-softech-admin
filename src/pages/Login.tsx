import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirects

const Login = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;
  const [key, setKey] = useState(''); // State to store the key input
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Check if JWT token is already in localStorage and redirect to home if present
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/'); // Redirect to the root page if JWT exists
    }
  }, [navigate]);

  // Handle the key input change
  const handleChange = (e) => {
    setKey(e.target.value);

    // Remove error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare data to be sent in the request body
    const body = JSON.stringify({ key });

    try {
      // Send POST request to /login endpoint
      const response = await fetch(`${SERVER_IP}:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'x-api-key': API_KEY
        },
        body, // Add the JSON body
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response if request is successful
        //console.log('Login successful:', data);

        // Save the JWT token in localStorage
        localStorage.setItem('jwt', data.payload);

        // Redirect to the root page
        navigate('/');
      } else {
        // Handle server errors
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.'); // Set error message
      }
    } catch (error) {
      console.error('Error:', error); // Catch any errors
      setError('An error occurred. Please try again.'); // Set a generic error message
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={4}>
          <h2 className="text-center my-4">Login</h2>
          {error && (
            <Alert variant="danger" className="mb-3">
              <i className="fas fa-exclamation-circle me-2"></i> {/* Font Awesome danger icon */}
              {error} {/* Display error message in a red box */}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formKey">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admin key"
                value={key}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
