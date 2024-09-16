// Import necessary modules and components
import React, { useState } from 'react';
import GeneratePlanPopup from '../../../components/generate_plan_popup/GeneratePlanPopup'; 

// Define the Muscle component
export const Muscle = () => {
  // State variables
  const [showPopup, setShowPopup] = useState(false); // Controls visibility of the GeneratePlanPopup
  const [workoutSchedule, setWorkoutSchedule] = useState([]); // Holds selected workout days
  const [healthIssues, setHealthIssues] = useState([]); // Stores health issues reported by the user
  const [gymAccess, setGymAccess] = useState(false); // Indicates if the user has gym access
  const [homeEquipment, setHomeEquipment] = useState([]); // Stores the user's available home equipment
  const [submissionErrors, setSubmissionErrors] = useState([]); // Holds any errors encountered during submission

  // Handles selection of workout days
  const handleDaySelection = (day) => {
    setWorkoutSchedule((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Handles selection of home equipment
  const handleEquipmentSelection = (equipment) => {
    setHomeEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((eq) => eq !== equipment) : [...prev, equipment]
    );
  };

  // Toggles the gym access state
  const toggleGymAccess = () => {
    setGymAccess(!gymAccess);
  };

  return (
    <div>
      <h1>Muscle Building Plan</h1> {/* Title of the page */}
      <button onClick={() => setShowPopup(true)} className="btn btn-primary">
        Generate Plan
      </button> {/* Button to show the GeneratePlanPopup */}
      <GeneratePlanPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        workoutSchedule={workoutSchedule}
        handleDaySelection={handleDaySelection}
        healthIssues={healthIssues}
        setHealthIssues={setHealthIssues}
        gymAccess={gymAccess}
        toggleGymAccess={toggleGymAccess}
        homeEquipment={homeEquipment}
        handleEquipmentSelection={handleEquipmentSelection}
        submissionErrors={submissionErrors}
        setSubmissionErrors={setSubmissionErrors} // Passing function to handle errors
      /> {/* Render the popup component with all necessary props */}
    </div>
  );
};
