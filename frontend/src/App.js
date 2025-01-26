import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Home from './components/home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Triage from './components/Triage'; 
import Doctor from './components/Doctor'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/doctor" element={<Doctor />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
