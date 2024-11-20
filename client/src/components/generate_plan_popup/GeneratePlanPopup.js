import React, { useState } from 'react';
import axios from 'axios';
import './GeneratePlanPopup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const GeneratePlanPopup = ({
  showPopup,
  setShowPopup,
  planName,
}) => {
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [generationError, setGenerationError] = useState('');
  const [workoutSchedule, setWorkoutSchedule] = useState([]);
  const [healthIssues, setHealthIssues] = useState([]);
  const [gymAccess, toggleGymAccess] = useState(false);
  const [homeEquipment, setHomeEquipment] = useState([]);
  const [submissionErrors, setSubmissionErrors] = useState([]);


  const handleDaySelection = (day) => {
    if (workoutSchedule.includes(day)) {
      setWorkoutSchedule(workoutSchedule.filter(d => d !== day));
    } else {
      setWorkoutSchedule([...workoutSchedule, day]);
    }
  };

  const handleHealthIssues = (issue) => {
    if (healthIssues.includes(issue)) {
      setHealthIssues(healthIssues.filter(i => i !== issue));
    } else {
      setHealthIssues([...healthIssues, issue]);
    }
  }

  const handleEquipmentSelection = (equipment) => {
    if (homeEquipment.includes(equipment)) {
      setHomeEquipment(homeEquipment.filter(e => e !== equipment));
    } else {
      setHomeEquipment([...homeEquipment, equipment]);
    }
  }


  const handleGeneratePlan = async () => {
    const workoutPrefs = {
      userEmail: localStorage.getItem('userEmail'),
      workoutPlan: planName,
      workoutSchedule: workoutSchedule || ['none'],
      healthIssues: healthIssues || ['none'],
      gymAccess: gymAccess || false,
      homeEquipment: homeEquipment || ['none']
    };

    try {
      const response = await axios.post('http://localhost:8080/api/workout/userPreferences', workoutPrefs);
      setGenerationError(''); // Clear any previous errors
      setSubmissionErrors([]); // Clear submission errors on successful plan generation
      window.location.href = '/plan_pages/WorkoutPlan';
    } catch (error) {
      console.error('Plan generation failed:', error);
      setGenerationError('Failed to generate the workout plan. Please try again.'); // Set error message
      setSubmissionErrors(['Failed to generate the workout plan. Please try again.']); // Set error message
    }
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup-content">
          <button onClick={() => setShowPopup(false)} className="close-button">X</button>
          <h2>Generate Workout Plan</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleGeneratePlan(); }}>
            {/* Workout days selection */}
            <div>
              <h3>Select Workout Days</h3>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <Form.Check
                  key={day}
                  type="checkbox"
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                  checked={workoutSchedule.includes(day)}
                  onChange={() => handleDaySelection(day)}
                  inline
                />
              ))}
            </div>

            {/* Health issues selection */}
            <div>
              <h3>Select Health Issues</h3>
              {['diabetes', 'high blood pressure', 'asthma'].map(issue => (
                <Form.Check
                  key={issue}
                  type="checkbox"
                  label={issue.charAt(0).toUpperCase() + issue.slice(1)}
                  checked={healthIssues.includes(issue)}
                  onChange={() => handleHealthIssues(issue)}
                  inline
                />
              ))}
            </div>
            <div>
              <h3>Do you have gym access?</h3>
              <Form.Check
                type="radio"
                id="gymAccessYes"
                name="gymAccess"
                label="Yes"
                checked={gymAccess}
                onChange={() => toggleGymAccess(true)}
              />
              <Form.Check
                type="radio"
                id="gymAccessNo"
                name="gymAccess"
                label="No"
                checked={!gymAccess}
                onChange={() => toggleGymAccess(false)}
              />
            </div>
            {/* Home equipment selection */}
            <div>
              <h3>Select Home Equipment</h3>
              {['dumbbell', 'resistance band', 'barbell', 'elliptical', 'treadmill'].map(equipment => (

                <Form.Check
                  type="checkbox"
                  id={equipment}
                  label={equipment.charAt(0).toUpperCase() + equipment.slice(1)}
                  checked={homeEquipment.includes(equipment)}
                  onChange={() => handleEquipmentSelection(equipment)}
                  key={equipment}
                  inline
                />
              ))}
            </div>
            <br />
            <button type="submit" className="btn btn-primary" onClick={() =>
              submissionErrors.length <= 0
                ?
                //window.location.href = '/plan_pages/WorkoutPlan'
                ''
                :
                ''
            }>
              Generate Plan
            </button>
          </form>

          {/* Display submission errors */}
          {submissionErrors.length > 0 && (
            <div className="error-messages">
              <h4>Please fix the following:</h4>
              <ul>
                {submissionErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display generated plan */}
          {generatedPlan && (
            <div className="generated-plan">
              <h3>Generated Workout Plan:</h3>
              <pre>{JSON.stringify(generatedPlan, null, 2)}</pre>
            </div>
          )}

          {/* Display generation error */}
          {generationError && (
            <div className="error-messages">
              <h4>{generationError}</h4>
            </div>
          )}
        </div>
      </div >
    )
  );
};

export default GeneratePlanPopup;
