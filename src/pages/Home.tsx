import React from 'react';
import { Card, CardGroup, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <Container
      className="d-flex flex-column align-items-center m-5"
      style={{ minHeight: 'calc(100vh - 70px)' }} // Subtract navbar height (assuming 56px navbar)
    >
      {/* Title placed outside the row */}
      <h1 className="text-center mb-4">Admin Panel</h1>

      {/* Card Group with gap between cards */}
      <CardGroup className="gap-4">
        {/* Blog Card */}
        <Card className="w-100" style={{ borderLeft: '5px solid #6c757d' }}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              {/* Font Awesome Icon for Blog */}
              <i
                className="fas fa-blog me-3"
                style={{ fontSize: '50px', color: '#6c757d' }} // Customize size and color
              />
              <div>
                <Card.Title>Blog</Card.Title>
                <Card.Text>
                  Manage blog posts — add, edit, or delete content on the main website.
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          {/* Card links to Blog page */}
          <Link to="/blog">
            <Button variant="link" className="w-100">Go to Blog Management</Button>
          </Link>
        </Card>

        {/* Career Card */}
        <Card className="w-100" style={{ borderLeft: '5px solid #6c757d' }}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              {/* Font Awesome Icon for Career */}
              <i
                className="fas fa-briefcase me-3"
                style={{ fontSize: '50px', color: '#6c757d' }} // Customize size and color
              />
              <div>
                <Card.Title>Career</Card.Title>
                <Card.Text>
                  Post and manage job or internship opportunities for candidates.
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          {/* Card links to Career page */}
          <Link to="/career">
            <Button variant="link" className="w-100">Go to Career Management</Button>
          </Link>
        </Card>
      </CardGroup>
    </Container>
  );
}

export default Home;
