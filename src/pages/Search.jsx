import React, { useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { Form } from 'react-bootstrap';

const dummyEvents = [
  {
    id: 1,
    title: 'React Workshop',
    date: '2025-08-01',
    description: 'A workshop on React basics and hooks.',
  },
  {
    id: 2,
    title: 'JavaScript Conference',
    date: '2025-08-15',
    description: 'Annual JS conference with talks and networking.',
  },
  {
    id: 3,
    title: 'CSS Masterclass',
    date: '2025-09-05',
    description: 'Deep dive into CSS Grid and Flexbox.',
  },
];

const Search = () => {
  const [search, setSearch] = useState('');
  const filteredEvents = dummyEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 className="mb-4">Search Events</h2>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form.Group>
      {filteredEvents.length ? (
        filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default Search;
