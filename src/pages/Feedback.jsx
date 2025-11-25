import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="p-4" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Feedback</h2>
      <p>We value your feedback! Please let us know your thoughts about the event management app.</p>
      {submitted && <Alert variant="success">Thank you for your feedback!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Feedback;
