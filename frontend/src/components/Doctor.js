import React from 'react';
import { useLocation } from 'react-router-dom';

const Doctor = () => {
  const location = useLocation();
  const { triageLevel } = location.state || {};

  const treatmentPlans = {
    'Level I': [
      "Emergency surgery required. Prepare for immediate resuscitation.",
      "Critical care intervention. Administer IV fluids and oxygen.",
    ],
    'Level II': [
      "Rapid intervention required. Stabilize and monitor vitals.",
      "Administer emergency medication and prepare for further diagnostics.",
    ],
    'Level III': [
      "Prescribe painkillers and suggest bed rest.",
      "Recommend additional lab tests for further evaluation.",
    ],
    'Level IV': [
      "Advise self-care and over-the-counter medication.",
      "Suggest scheduling a follow-up within a week.",
    ],
    'Level V': [
      "Recommend hydration and rest. No immediate action required.",
      "Discharge with instructions for home care.",
    ],
  };

  const getTreatmentPlan = (triage) => {
    for (const [level, plans] of Object.entries(treatmentPlans)) {
      if (triage.includes(level)) {
        return plans[Math.floor(Math.random() * plans.length)];
      }
    }
    return "No treatment plan available.";
  };

  const treatment = triageLevel ? getTreatmentPlan(triageLevel) : "No triage level provided.";

  return (
    <div>
      <h1>Doctor's Treatment Plan</h1>
      {triageLevel ? (
        <div>
          <h2>Your Triage Level: {triageLevel}</h2>
          <p><strong>Treatment:</strong> {treatment}</p>
        </div>
      ) : (
        <p>Please complete the triage process first.</p>
      )}
    </div>
  );
};

export default Doctor;