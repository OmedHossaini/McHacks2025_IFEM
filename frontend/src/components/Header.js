// src/components/Header.js (updated with triage link)
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <button><Link to="/dashboard">Dashboard</Link></button>
              </li>
              <li>
                <button><Link to="/triage">Triage</Link></button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button><Link to="/login">Login</Link></button>
              </li>
              <li>
                <button><Link to="/register">Register</Link></button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
