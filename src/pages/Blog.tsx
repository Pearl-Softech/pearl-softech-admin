import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap'; // Added Alert for success/error messages
import { Link } from 'react-router-dom'; // Link for navigation

function Blog() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;
  const [blogs, setBlogs] = useState([]); // Initialize as empty array
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [body, setBody] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  useEffect(() => {
    const content = {
      method: 'GET', // GET request
      headers: {
        'x-api-key': API_KEY
      }
    };
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${SERVER_IP}:8080/get-blogs`, content); // API endpoint to get blogs
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.blogs); // Assuming the API returns a 'blogs' array
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'body') {
      setBody(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // Set the base64 image result
      };
      reader.readAsDataURL(file); // Convert image file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = {
      method: 'POST', // POST request
      headers: {
        'Content-Type': 'application/json', // Tell the server we're sending JSON
        'x-api-key': 'abc'
      },
      body: JSON.stringify({
        title,
        thumbnail,
        body
      }),
    };

    try {
      let res = await fetch("http://192.168.1.64:8080/add-blog", content); // Send data to API
      if (res.ok) {
        setTitle("");
        setThumbnail("");
        setBody("");
        setShowForm(false); // Hide the form
      } else {
        console.error('Error creating blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleDelete = async (id) => {
    const content = {
      method: 'DELETE', // DELETE request
      headers: {
        'x-api-key': 'abc'
      }
    };

    try {
      const res = await fetch(`http://192.168.1.64:8080/delete-blog/${id}`, content); // Delete API call
      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || 'Blog deleted successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to delete blog.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error deleting blog.');
      setSuccessMessage('');
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Blog Management</h1>

      {/* Success or Error Message */}
      {successMessage && (
        <Alert variant="success">
          <i className="fas fa-check-circle me-2"></i> {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger">
          <i className="fas fa-exclamation-circle me-2"></i> {errorMessage}
        </Alert>
      )}

      {/* Add Blog Button */}
      <div className="text-end mb-4">
        <Button
          variant="primary"
          onClick={() => setShowForm(true)} // Show form
        >
          <i className="fas fa-plus me-2"></i> Add Blog
        </Button>
      </div>

      {/* Flexbox Layout for Form and Cards */}
      <div className="d-flex justify-content-center align-items-center position-relative">
        {/* Show the Add Blog Form when showForm is true */}
        {showForm && (
          <Card className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '600px' }}>
            {/* Close Button */}
            <Button
              variant="danger"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => setShowForm(false)} // Hide the form
            >
              <i className="fas fa-times"></i>
            </Button>

            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBlogTitle" className="mb-3">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBlogThumbnail" className="mb-3">
                  <Form.Label>Blog Thumbnail</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    onChange={handleFileChange}
                    required
                  />
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Thumbnail Preview"
                      className="mt-3"
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  )}
                </Form.Group>

                <Form.Group controlId="formBlogBody" className="mb-3">
                  <Form.Label>Blog Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter blog body"
                    name="body"
                    value={body}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Add Blog
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Only render Blog Cards when showForm is false */}
        {!showForm && (
          <Row className="g-4 justify-content-center pt-5 w-100">
            {blogs.map((blog) => (
              <Col md={4} key={blog._id}> {/* Use _id as key */}
                {/* Blog Card */}
                <Card>
                  <Link to={`https://pearlsoftech.com/blog/${blog._id}`}>
                    <Card.Img variant="top" src={blog.thumbnail} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </Link>
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                      <p className="blog-date">
                        <i className="fa-solid fa-calendar-days"></i>
                        {" " + new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </Card.Subtitle>
                    <Card.Text>
                      {blog.body.length > 100 ? blog.body.substring(0, 100) + '...' : blog.body}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="success">
                        <i className="fas fa-edit me-2"></i> Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                        <i className="fas fa-trash-alt me-2"></i> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default Blog;
