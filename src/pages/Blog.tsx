import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Blog() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [body, setBody] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refress, setRefress] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');

  // Dots animation effect for loading
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setLoadingDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const content = {
      method: 'GET',
      headers: { 'x-api-key': API_KEY }
    };
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${SERVER_IP}:8080/get-blogs`, content);
        const data = await response.json();
        if (response.ok) setBlogs(data.blogs);
        else console.error('Failed to fetch blogs');
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [refress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'body') setBody(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ title, thumbnail, body }),
    };
    try {
      let res = await fetch(`${SERVER_IP}:8080/add-blog`, content);
      if (res.ok) {
        setTitle("");
        setThumbnail("");
        setBody("");
        setShowForm(false);
        setRefress(!refress);
      } else console.error('Error creating blog');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    const content = { method: 'DELETE', headers: { 'x-api-key': API_KEY } };
    try {
      const res = await fetch(`${SERVER_IP}:8080/delete-blog/${id}`, content);
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Blog deleted successfully!');
        setErrorMessage('');
        setRefress(!refress);
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
      <h1 className="text-center mb-4"><i className="fas fa-blog me-2"></i> Blog Management</h1>

      {successMessage && (
        <Alert variant="success"><i className="fas fa-check-circle me-2"></i>{successMessage}</Alert>
      )}
      {errorMessage && (
        <Alert variant="danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</Alert>
      )}

      <div className="text-end mb-4">
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="fas fa-plus me-2"></i> Add Blog
        </Button>
      </div>

      {blogs.length === 0 ? (
        <div style={{height:"50dvh", width:"100%", display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h2 style={{ width: "100%", textAlign: "center" }}>Loading{loadingDots}</h2>
        </div>
      ) : null}

      <div className="d-flex justify-content-center align-items-center position-relative">
        {showForm && (
          <Card className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '600px' }}>
            <Button variant="danger" className="position-absolute top-0 end-0 m-2" onClick={() => setShowForm(false)}>
              <i className="fas fa-times"></i>
            </Button>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBlogTitle" className="mb-3">
                  <Form.Label><i className="fas fa-heading me-2"></i>Blog Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter blog title" name="title" value={title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBlogThumbnail" className="mb-3">
                  <Form.Label><i className="fas fa-image me-2"></i>Blog Thumbnail</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                  {thumbnail && (
                    <img src={thumbnail} alt="Thumbnail Preview" className="mt-3" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                  )}
                </Form.Group>

                <Form.Group controlId="formBlogBody" className="mb-3">
                  <Form.Label><i className="fas fa-align-left me-2"></i>Blog Body</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter blog body" name="body" value={body} onChange={handleChange} required />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit"><i className="fas fa-paper-plane me-2"></i>Add Blog</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        {!showForm && (
          <Row className="g-4 justify-content-center pt-5 w-100">
            {blogs.map((blog) => (
              <Col md={4} key={blog._id}>
                <Card>
                  <Link to={`https://pearlsoftech.com/blog/${blog._id}`} target="_blank">
                    <Card.Img variant="top" src={blog.thumbnail} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </Link>
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                      <i className="fa-solid fa-calendar-days me-2"></i>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
