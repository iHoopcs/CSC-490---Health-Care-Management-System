import React, { useState } from 'react';
import axios from 'axios';
import './GeneratePlanPopup.css';

const GeneratePlanPopup = ({
  showPopup,
  setShowPopup,
  workoutSchedule,
  handleDaySelection,
  healthIssues,
  setHealthIssues,
  gymAccess = false,
  toggleGymAccess,
  homeEquipment,
  handleEquipmentSelection,
  submissionErrors,
  setSubmissionErrors
}) => {
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [generationError, setGenerationError] = useState('');

  const handleGeneratePlan = async () => {
    const workoutPrefs = {
      userEmail: localStorage.getItem('userEmail'),
      workoutPlan: 'build-muscle', // Static plan type for muscle building
      workoutSchedule: workoutSchedule || ['none'],
      healthIssues: healthIssues || ['none'],
      gymAccess: gymAccess || false,
      homeEquipment: homeEquipment || ['none']
    };

    try {
      const response = await axios.post('http://localhost:8080/api/workout/userPreferences', workoutPrefs);
      setGeneratedPlan(response.data); // Save the generated plan
      setGenerationError(''); // Clear any previous errors
      setSubmissionErrors([]); // Clear submission errors on successful plan generation
      window.location.href = '/plan_pages/WorkoutPlan';
    } catch (error) {
      console.error('Plan generation failed:', error);
      setGeneratedPlan(null); // Clear any previous plan on failure
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
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={workoutSchedule.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day.charAt(0).toUpperCase() + day.slice(1)}   {/* Changes first letter to capital to make it more readable */}
                </label>
              ))}
            </div>

            {/* Health issues selection */}
            <div>
              <h3>Select Health Issues</h3>
              {['diabetes', 'high blood pressure', 'asthma'].map(issue => (
                <label key={issue}>
                  <input
                    type="checkbox"
                    checked={healthIssues.includes(issue)}
                    onChange={() => setHealthIssues(prev =>
                      prev.includes(issue) ? prev.filter(h => h !== issue) : [...prev, issue]
                    )}
                  />
                  {issue.charAt(0).toUpperCase() + issue.slice(1)}
                </label>
              ))}
            </div>

            {/* Gym access toggle */}
            <div>
              <h3>Do you have gym access?</h3>
              <label>
                <input
                  type="radio"
                  name="gymAccess"
                  checked={gymAccess}
                  onChange={() => toggleGymAccess(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="gymAccess"
                  checked={!gymAccess}
                  onChange={() => toggleGymAccess(false)}
                />
                No
              </label>
            </div>

            {/* Home equipment selection */}
            <div>
              <h3>Select Home Equipment</h3>
              {['dumbbell', 'resistance band', 'barbell', 'elliptical', 'treadmill'].map(equipment => (
                <label key={equipment}>
                  <input
                    type="checkbox"
                    checked={homeEquipment.includes(equipment)}
                    onChange={() => handleEquipmentSelection(equipment)}
                  />
                  {equipment.charAt(0).toUpperCase() + equipment.slice(1)}
                </label>
              ))}
            </div>
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
      </div>
    )
  );
};

export default GeneratePlanPopup;
