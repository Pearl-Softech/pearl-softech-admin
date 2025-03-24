import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

function Career() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;

  const [careers, setCareers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [qualification, setQualification] = useState([]);
  const [qualificationInput, setQualificationInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [tags, setTags] = useState([]);
  const [type, setType] = useState('Full Time');
  const [workMode, setWorkMode] = useState('Onsite');
  const [jobLevel, setJobLevel] = useState('Entry Level');
  const [salary, setSalary] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [editCareerId, setEditCareerId] = useState('');

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(`${SERVER_IP}:8080/get-careers`, {
          method: 'GET',
          headers: { 'x-api-key': API_KEY },
        });
        const data = await res.json();
        if (res.ok) setCareers(data.careers);
        else console.error('Failed to fetch careers');
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    };
    fetchCareers();
  }, [refresh]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setQualification([]);
    setRequiredSkills([]);
    setTags([]);
    setType('Full Time');
    setWorkMode('Onsite');
    setJobLevel('Entry Level');
    setSalary('');
    setQualificationInput('');
    setSkillInput('');
    setEditCareerId('');
  };

  const handleAddQualification = () => {
    if (qualificationInput.trim()) {
      setQualification([...qualification, qualificationInput.trim()]);
      setQualificationInput('');
    }
  };

  const handleRemoveQualification = (index) => {
    setQualification(qualification.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index));
  };

  const handleTagChange = (tag) => {
    if (tags.includes(tag)) setTags(tags.filter((t) => t !== tag));
    else setTags([...tags, tag]);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);
    if (qualification.length === 0 || requiredSkills.length === 0 || tags.length === 0) {
      setErrorMessage('Please add at least one qualification, skill, and tag.');
      setLoadingAdd(false);
      return;
    }
    try {
      const res = await fetch(`${SERVER_IP}:8080/add-career`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ title, description, deadline, qualification, requiredSkills, tags, type, workMode, jobLevel, salary }),
      });
      if (res.ok) {
        setSuccessMessage('Career added successfully!');
        setShowAddForm(false);
        resetForm();
        setRefresh(!refresh);
      } else setErrorMessage('Failed to add career.');
    } catch (error) {
      setErrorMessage('Error adding career.');
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) return;
    try {
      const res = await fetch(`${SERVER_IP}:8080/delete-career/${id}`, { method: 'DELETE', headers: { 'x-api-key': API_KEY } });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Career deleted successfully!');
        setRefresh(!refresh);
      } else setErrorMessage(data.message || 'Failed to delete career.');
    } catch (error) {
      setErrorMessage('Error deleting career.');
    }
  };

  const handleEdit = (career) => {
    setEditCareerId(career._id);
    setTitle(career.title);
    setDescription(career.description);
    setDeadline(career.deadline);
    setQualification(career.qualification);
    setRequiredSkills(career.requiredSkills);
    setTags(career.tags);
    setType(career.type);
    setWorkMode(career.workMode);
    setJobLevel(career.jobLevel);
    setSalary(career.salary);
    setShowEditForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const res = await fetch(`${SERVER_IP}:8080/update-career/${editCareerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ title, description, deadline, qualification, requiredSkills, tags, type, workMode, jobLevel, salary }),
      });
      if (res.ok) {
        setSuccessMessage('Career updated successfully!');
        setShowEditForm(false);
        resetForm();
        setRefresh(!refresh);
      } else setErrorMessage('Failed to update career.');
    } catch (error) {
      setErrorMessage('Error updating career.');
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4"><i className="fas fa-briefcase me-2"></i> Career Management</h1>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <div className="text-end mb-4">
        {!showAddForm && !showEditForm && (
          <Button variant="primary" onClick={() => setShowAddForm(true)}>
            <i className="fas fa-plus me-2"></i> Add Career
          </Button>
        )}
      </div>

      {careers.length === 0 && !showAddForm && !showEditForm ? (
        <div style={{ height: "50dvh" }} className="d-flex align-items-center justify-content-center">
          <PulseLoader />
        </div>
      ) : null}

      {/* Add Form */}
      {(showAddForm || showEditForm) && (
        <Card className="p-4 shadow-lg w-100 mx-auto" style={{ maxWidth: '700px' }}>
          <Button variant="danger" className="position-absolute top-0 end-0 m-2" onClick={() => { setShowAddForm(false); setShowEditForm(false); resetForm(); }}>
            <i className="fas fa-times"></i>
          </Button>
          <Card.Body>
            <Form onSubmit={showAddForm ? handleAddSubmit : handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-briefcase me-2"></i> Title
                </Form.Label>
                <Form.Control placeholder="Enter job title" value={title} onChange={e => setTitle(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-align-left me-2"></i> Description
                </Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter job description" value={description} onChange={e => setDescription(e.target.value)} required />
              </Form.Group>

              {/* Qualification */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-graduation-cap me-2"></i> Qualification
                </Form.Label>
                <div className="d-flex gap-3">
                  <Form.Control placeholder="Add qualification" value={qualificationInput} onChange={e => setQualificationInput(e.target.value)} />
                  <Button variant="success" onClick={handleAddQualification}>Add</Button>
                </div>
                <ul className='p-3'>{qualification.map((q, idx) => (
                  <li key={idx}>
                    {q} <Button variant="danger" onClick={() => handleRemoveQualification(idx)}>&times;</Button>
                  </li>
                ))}</ul>
              </Form.Group>

              {/* Required Skills */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-cogs me-2"></i> Required Skills
                </Form.Label>
                <div className="d-flex gap-3">
                  <Form.Control placeholder="Add skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
                  <Button variant="success" onClick={handleAddSkill}>Add</Button>
                </div>
                <ul className='p-3'>{requiredSkills.map((s, idx) => (
                  <li key={idx}>
                    {s} <Button variant="danger" onClick={() => handleRemoveSkill(idx)}>&times;</Button>
                  </li>
                ))}</ul>
              </Form.Group>

              {/* Tags */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-tags me-2"></i> Tags
                </Form.Label><br />
                {['Software Development', 'Digital Marketing', 'Web Development'].map(tag => (
                  <Form.Check key={tag} inline label={tag} type="checkbox" checked={tags.includes(tag)} onChange={() => handleTagChange(tag)} />
                ))}
              </Form.Group>

              {/* Type */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-briefcase me-2"></i> Type
                </Form.Label>
                <Form.Select value={type} onChange={e => setType(e.target.value)} required>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </Form.Select>
              </Form.Group>

              {/* Work Mode */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-laptop me-2"></i> Work Mode
                </Form.Label>
                <Form.Select value={workMode} onChange={e => setWorkMode(e.target.value)} required>
                  <option>Onsite</option>
                  <option>Remote</option>
                </Form.Select>
              </Form.Group>

              {/* Job Level */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-level-up-alt me-2"></i> Job Level
                </Form.Label>
                <Form.Select value={jobLevel} onChange={e => setJobLevel(e.target.value)} required>
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior</option>
                </Form.Select>
              </Form.Group>

              {/* Salary */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <i className="fas fa-dollar-sign me-2"></i> Salary
                </Form.Label>
                <Form.Control placeholder="Enter salary" value={salary} onChange={e => setSalary(e.target.value)} required />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" disabled={loadingAdd || loadingUpdate}>
                  {loadingAdd || loadingUpdate ? <PulseLoader size={8} color="#fff" /> : showAddForm ? 'Add Career' : 'Update Career'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Displaying careers */}
      {!showAddForm && !showEditForm && (
        <Row>
          {careers.map((career) => (
            <Col key={career._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Link to={"https://pearlsoftech.com/career/" + career._id} style={{ color: "black", textDecoration: "none" }}>
                    <Card.Title>{career.title}</Card.Title>
                    {/* Remove description */}
                  </Link>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleEdit(career)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(career._id)}>
                      Delete
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

export default Career;
