import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-4" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 className="mb-4 text-center">Contact Us</h2>
      <Card className="mb-4 shadow-lg border-0 rounded-4">
        <Card.Body>
          <h5 className="mb-3">Our Contact Information</h5>
          <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
            <div>
              <p className="mb-1"><strong>Email:</strong> <span style={{ color: '#6366f1' }}>support@eventmanager.com</span></p>
              <p className="mb-1"><strong>Phone:</strong> <span style={{ color: '#6366f1' }}>+1 234 567 8901</span></p>
              <p className="mb-0"><strong>Address:</strong> <span style={{ color: '#6366f1' }}>123 Event St, City, Country</span></p>
            </div>
            <div>
              <i className="bi bi-envelope" style={{ fontSize: '2rem', color: '#6366f1' }}></i>
            </div>
          </div>
        </Card.Body>
      </Card>
      {submitted && <Alert variant="success" className="mb-4">Thank you for contacting us! We'll get back to you soon.</Alert>}
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">Send Message</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContactUs;
