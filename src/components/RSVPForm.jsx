import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';

const RSVPForm = ({ eventTitle, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(`Thanks, ${data.name}, for RSVP to ${eventTitle}!`);
    reset();
    onClose();
  };

  return (
    <>
      {isSubmitSuccessful && <Alert variant="success">RSVP successful!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit RSVP
        </Button>
      </Form>
    </>
  );
};

export default RSVPForm;
