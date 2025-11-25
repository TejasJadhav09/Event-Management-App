import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to EventManager</h1>
      <p className="home-subtitle">
        Discover exciting upcoming events, manage your RSVPs, and connect with communities.
        Stay updated and never miss out on what matters to you!
      </p>
      <button
        className="home-cta-button"
        onClick={() => navigate('/events')}
        aria-label="Go to events page"
      >
        Browse Events
      </button>
    </div>
  );
};

export default Home;
