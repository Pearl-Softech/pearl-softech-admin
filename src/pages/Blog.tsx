import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

function Blog() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [body, setBody] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [editBlogId, setEditBlogId] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${SERVER_IP}/get-blogs`, {
          method: 'GET',
          headers: { 'x-api-key': API_KEY }
        });
        const data = await res.json();
        if (res.ok) setBlogs(data.blogs);
        else console.error('Failed to fetch blogs');
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [refresh]);

  const resetForm = () => {
    setTitle('');
    setThumbnail('');
    setBody('');
    setEditBlogId('');
    setEditThumbnail('');
  };

  // Handle image selection
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => isEdit ? setEditThumbnail(reader.result) : setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Add Blog
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);
    try {
      const res = await fetch(`${SERVER_IP}/add-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ title, thumbnail, body }),
      });
      if (res.ok) {
        setSuccessMessage('Blog added successfully!');
        setShowAddForm(false);
        resetForm();
        setRefresh(!refresh);
      } else {
        setErrorMessage('Failed to add blog.');
      }
    } catch (error) {
      setErrorMessage('Error adding blog.');
    } finally {
      setLoadingAdd(false);
    }
  };

  // Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`${SERVER_IP}/delete-blog/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY }
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Blog deleted successfully!');
        setRefresh(!refresh);
      } else setErrorMessage(data.message || 'Failed to delete blog.');
    } catch (error) {
      setErrorMessage('Error deleting blog.');
    }
  };

  // Open Edit Form
  const handleEdit = (blog) => {
    setEditBlogId(blog._id);
    setTitle(blog.title);
    setEditThumbnail(blog.thumbnail);
    setBody(blog.body);
    setShowEditForm(true);
  };

  // Update Blog
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const res = await fetch(`${SERVER_IP}/update-blog/${editBlogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ title, thumbnail: editThumbnail, body }),
      });
      if (res.ok) {
        setSuccessMessage('Blog updated successfully!');
        setShowEditForm(false);
        resetForm();
        setRefresh(!refresh);
      } else {
        setErrorMessage('Failed to update blog.');
      }
    } catch (error) {
      setErrorMessage('Error updating blog.');
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">
        <i className="fas fa-blog me-2"></i> Blog Management
      </h1>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Link to Blog Body Guide Component */}
      <div>
        {!showAddForm && !showEditForm && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
            <Link to="/blog-body-guide">
              Blog Body Styling Guide
            </Link>
            <Button variant="primary" onClick={() => setShowAddForm(true)} className='me-2'>
              <i className="fas fa-plus me-2"></i> Add Blog
            </Button>
          </div>
        )}
      </div>

      {/* Loading when blogs are fetching */}
      {blogs.length === 0 && !showAddForm && !showEditForm ? (
        <div style={{ height: "50dvh" }} className="d-flex align-items-center justify-content-center">
          <PulseLoader />
        </div>
      ) : null}

      {/* Add Blog Form */}
      {showAddForm && (
        <Card className="p-4 shadow-lg w-100 mx-auto" style={{ maxWidth: '600px' }}>
          <Button variant="danger" className="position-absolute top-0 end-0 m-2" onClick={() => { setShowAddForm(false); resetForm(); }}>
            <i className="fas fa-times"></i>
          </Button>
          <Card.Body>
            <Form onSubmit={handleAddSubmit}>
              <Form.Group className="mb-3">
                <i className='fa-solid fa-heading me-2'></i>
                <Form.Label className='fw-bold'>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="Enter blog title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <i className='fa-solid fa-image me-2'></i>
                <Form.Label className='fw-bold'>Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e)}
                  required
                />
                {thumbnail && <img src={thumbnail} alt="Preview" className="mt-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              </Form.Group>

              <Form.Group className="mb-3">
                <i className='fa-solid fa-align-left me-2'></i>
                <Form.Label className='fw-bold'>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  required
                  placeholder="Enter blog body"
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" disabled={loadingAdd}>
                  {loadingAdd ? <PulseLoader size={8} color="#fff" /> : 'Add Blog'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Edit Blog Form */}
      {showEditForm && (
        <Card className="p-4 shadow-lg w-100 mx-auto" style={{ maxWidth: '750px' }}>
          <Button variant="danger" className="position-absolute top-0 end-0 m-2" onClick={() => { setShowEditForm(false); resetForm(); }}>
            <i className="fas fa-times"></i>
          </Button>
          <Card.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <i className='fa-solid fa-heading me-2'></i>
                <Form.Label className='fw-bold'>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="Edit blog title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <i className='fa-solid fa-image me-2'></i>
                <Form.Label className='fw-bold'>Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, true)}
                  placeholder="Upload a new thumbnail (optional)"
                />
                {editThumbnail && <img src={editThumbnail} alt="Preview" className="mt-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              </Form.Group>

              <Form.Group className="mb-3">
                <i className='fa-solid fa-align-left me-2'></i>
                <Form.Label className='fw-bold'>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  required
                  placeholder="Edit blog body"
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="success" type="submit" disabled={loadingUpdate}>
                  {loadingUpdate ? <PulseLoader size={8} color="#fff" /> : 'Update Blog'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Blog List */}
      {!showAddForm && !showEditForm && (
        <Row className="g-4 justify-content-center pt-4">
          {blogs.map(blog => (
            <Col md={4} key={blog._id}>
              <Card>
                <Link to={`https://pearlsoftech.com/blog/${blog._id}`} target="_blank">
                  <Card.Img variant="top" src={blog.thumbnail} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </Link>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <i className="fa-solid fa-calendar-days me-2"></i>
                    {new Date(blog.createdAt).toLocaleDateString()} |
                    <i className='fa-solid fa-eye ms-3 me-1'></i>{blog.views} Views
                  </Card.Subtitle>
                  <Card.Text>
                    {blog.body.length > 100 ? blog.body.substring(0, 100) + '...' : blog.body}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => handleEdit(blog)}>
                      <i className="fas fa-edit me-2"></i>Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                      <i className="fas fa-trash-alt me-2"></i>Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Blog;
