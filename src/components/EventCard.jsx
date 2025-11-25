import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import RSVPForm from './RSVPForm.jsx';

const EventCard = ({ event, onEdit, onDelete }) => {
  const [showRSVP, setShowRSVP] = useState(false);

  const handleClose = () => setShowRSVP(false);
  const handleShow = () => setShowRSVP(true);

  return (
    <>
      <Card className="mb-3">
        {event.image && (
          <Card.Img variant="top" src={event.image} alt="Event" style={{ maxHeight: 200, objectFit: 'cover' }} />
        )}
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(event.date).toLocaleDateString()} | {event.category}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            RSVP
          </Button>
          <Button variant="warning" className="ms-2" onClick={() => onEdit(event)}>
            Edit
          </Button>
          <Button variant="danger" className="ms-2" onClick={() => onDelete(event.id)}>
            Delete
          </Button>
          {event.rsvps && event.rsvps.length > 0 && (
            <div className="mt-3">
              <strong>RSVPs:</strong>
              <ul style={{ paddingLeft: 20 }}>
                {event.rsvps.map((r, idx) => (
                  <li key={idx}>{r.name} ({r.email})</li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showRSVP} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>RSVP for {event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RSVPForm eventTitle={event.title} onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventCard;
