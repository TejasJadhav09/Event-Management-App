import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(ev => String(ev.id) === id);

  if (!event) {
    return <div className="p-4">Event not found.</div>;
  }

  return (
    <div className="p-4">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export default EventDetails;
