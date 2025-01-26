// src/components/Home.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
  }

  return (
    <div>
      <h1>Welcome to the IFEM Emergency Department</h1>
      
    </div>
  );
};

export default Home;
