import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Triage = () => {
  const [feeling, setFeeling] = useState(5);
  const [pain, setPain] = useState(5);
  const [breathing, setBreathing] = useState(5);
  const [consciousness, setConsciousness] = useState(5);
  const [heartRate, setHeartRate] = useState(5);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  
  const [triageLevel, setTriageLevel] = useState('');
  const [waitMessage, setWaitMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age) {
      alert('Please fill out your basic information.');
      return;
    }

    const score = feeling + pain + breathing + consciousness + heartRate;

    let level;
    if (score <= 10) {
      level = 'Level I: Blue - Severely ill and requires resuscitation';
    } else if (score <= 15) {
      level = 'Level II: Red - Requires emergent care and rapid medical intervention';
    } else if (score <= 20) {
      level = 'Level III: Yellow - Requires urgent care';
    } else if (score <= 25) {
      level = 'Level IV: Green - Requires less-urgent care';
    } else {
      level = 'Level V: White - Requires non-urgent care';
    }

    setTriageLevel(level);

    const reportData = {
      name,
      age,
      date: new Date().toLocaleDateString(),
      triageLevel: level,
    };

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(reportData);
    localStorage.setItem('reports', JSON.stringify(reports));

    if (score <= 15) {
      navigate('/doctor', { state: { triageLevel: level } });
    } else {
      const waitTime = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
      setWaitMessage(`You will be redirected to the doctor in ${waitTime} seconds.`);
      setTimeout(() => {
        navigate('/doctor', { state: { triageLevel: level } });
      }, waitTime * 1000);
    }
  };

  return (
    <div>
      <h1>Triage Assessment</h1>
      <form onSubmit={handleSubmit}>
        <h2>Basic Information</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <h2>Medical Inputs</h2>
        <label>How are you feeling (1-10): </label>
        <input
          type="number"
          value={feeling}
          onChange={(e) => setFeeling(Number(e.target.value))}
          min="1"
          max="10"
          required
        />
        <label>Pain level (1-10): </label>
        <input
          type="number"
          value={pain}
          onChange={(e) => setPain(Number(e.target.value))}
          min="1"
          max="10"
          required
        />
        <label>Breathing (1-10): </label>
        <input
          type="number"
          value={breathing}
          onChange={(e) => setBreathing(Number(e.target.value))}
          min="1"
          max="10"
          required
        />
        <label>Consciousness level (1-10): </label>
        <input
          type="number"
          value={consciousness}
          onChange={(e) => setConsciousness(Number(e.target.value))}
          min="1"
          max="10"
          required
        />
        <label>Heart rate (1-10): </label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(Number(e.target.value))}
          min="1"
          max="10"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {triageLevel && (
        <div>
          <h2>Your Triage Level:</h2>
          <p>{triageLevel}</p>
        </div>
      )}

      {waitMessage && <p>{waitMessage}</p>}
    </div>
  );
};

export default Triage;
