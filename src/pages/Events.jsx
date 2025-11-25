import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventDetails from './EventDetails.jsx';
import EventCard from '../components/EventCard.jsx';
import { Button, Form, Modal } from 'react-bootstrap';

const Events = ({ detailsMode }) => {
  // Initial dummy events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'React Workshop',
      date: '2025-08-01',
      description: 'A workshop on React basics and hooks.',
      category: 'Workshop',
      image: '',
      rsvps: [],
    },
    {
      id: 2,
      title: 'JavaScript Conference',
      date: '2025-08-15',
      description: 'Annual JS conference with talks and networking.',
      category: 'Conference',
      image: '',
      rsvps: [],
    },
    {
      id: 3,
      title: 'CSS Masterclass',
      date: '2025-09-05',
      description: 'Deep dive into CSS Grid and Flexbox.',
      category: 'Masterclass',
      image: '',
      rsvps: [],
    },
  ]);

  const [filterDate, setFilterDate] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    category: '',
    image: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');

  // Filter events by selected date and search
  let filteredEvents = events;
  if (filterDate) {
    filteredEvents = filteredEvents.filter((e) => e.date === filterDate);
  }
  if (filterCategory) {
    filteredEvents = filteredEvents.filter((e) => e.category === filterCategory);
  }
  if (search) {
    filteredEvents = filteredEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Open/Close modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewEvent({ title: '', date: '', description: '' });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewEvent({ ...newEvent, image: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  // Add new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newId = events.length ? Math.max(...events.map(ev => ev.id)) + 1 : 1;
    setEvents([...events, { id: newId, ...newEvent, rsvps: [] }]);
    handleClose();
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Open edit modal
  const handleEditEvent = (event) => {
    setEditEvent(event);
    setEditModal(true);
  };

  // Close edit modal
  const handleEditClose = () => {
    setEditModal(false);
    setEditEvent(null);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditEvent({ ...editEvent, image: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditEvent({ ...editEvent, [name]: value });
    }
  };

  // Save edited event
  const handleEditSave = (e) => {
    e.preventDefault();
    setEvents(events.map(ev => ev.id === editEvent.id ? editEvent : ev));
    handleEditClose();
  };

  if (detailsMode) {
    // Show details page for event
    const { id } = useParams();
    return <EventDetails events={events} />;
  }

  return (
    <div className="p-4">
      <h2>Upcoming Events</h2>

      {/* Search Bar */}
      <Form.Group className="mb-3" style={{ maxWidth: '400px' }}>
        <Form.Label>Search Events:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form.Group>

      {/* Filter */}
      <Form.Group className="mb-3" style={{ maxWidth: '300px' }}>
        <Form.Label>Filter by Date:</Form.Label>
        <Form.Control
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <Button variant="secondary" className="mt-2" onClick={() => setFilterDate('')}>
          Clear Filter
        </Button>
      </Form.Group>
      <Form.Group className="mb-3" style={{ maxWidth: '300px' }}>
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          {[...new Set(events.map(ev => ev.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Add Event Button */}
      <Button variant="primary" className="mb-4" onClick={handleShow}>
        + Add New Event
      </Button>

      {/* Events List */}
      {filteredEvents.length ? (
        filteredEvents.map((event) => (
          <div key={event.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/events/${event.id}`)}>
            <EventCard
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </div>
        ))
      ) : (
        <p>No events found for selected date or search.</p>
      )}

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEvent}>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newEvent.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newEvent.category}
                onChange={handleChange}
                required
                placeholder="e.g. Workshop, Conference, Masterclass"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={editModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEvent && (
            <Form onSubmit={handleEditSave}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editEvent.title}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={editEvent.date}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editEvent.description}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={editEvent.category}
                  onChange={handleEditChange}
                  required
                  placeholder="e.g. Workshop, Conference, Masterclass"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                />
                {editEvent.image && (
                  <img src={editEvent.image} alt="Event" style={{ maxWidth: '100%', marginTop: 8, borderRadius: 8 }} />
                )}
              </Form.Group>
              <Button variant="success" type="submit">
                Update Event
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Events;
