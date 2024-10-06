import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Workouts.css'; // Import custom CSS for card styles and effects
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { Link } from 'react-router-dom'; // Import Link from React Router
import GeneratePlanPopup from '../../components/generate_plan_popup/GeneratePlanPopup';

// Import images
import weightSetImage from './plan_images/weight_set.jpg';
import weightLossImage from './plan_images/runner.jpg';
import casualImage from './plan_images/healthy.jpg';

export const Workouts = () => {
  const [showPopup, setShowPopup] = useState(false); // Controls visibility of the GeneratePlanPopup
  const [planName, setPlanName] = useState('')

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="text-center mb-4">Workout Plans</h1>
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {/* Card 1 */}
        <div className="card-container d-flex flex-column align-items-center mb-4">
          <div className="card-flip">
            <div className="card-inner">
              <div className="card front text-center p-4">
                <div className="outertext">
                  <h2 className="labeltext">Building Muscle</h2>
                </div>
              </div>
              <div className="card back text-center p-4 d-flex flex-column justify-content-between align-items-center">
                <img src={weightSetImage} alt="Building Muscle" className="card-image" />
                <div>
                  <p>Details: Heavy lifting and High protein meals</p>
                  <p>Difficulty: Beginner to Expert</p>
                  <p>Intensity: Low - High</p>
                </div>
                <Button onClick={() => { setShowPopup(true); setPlanName('build-muscle') }}>
                  Start Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="card-container d-flex flex-column align-items-center mb-4">
          <div className="card-flip">
            <div className="card-inner">
              <div className="card front text-center p-4">
                <div className="outertext">
                  <h2>Weight Loss</h2>
                </div>
              </div>
              <div className="card back text-center p-4 d-flex flex-column justify-content-between align-items-center">
                <img src={weightLossImage} alt="Weight Loss" className="card-image" />
                <div>
                  <p>Details: Heavy lifting and calorie deficit</p>
                  <p>Difficulty: Beginner to intermediate</p>
                  <p>Intensity: Low - Medium</p>
                </div>
                <Button onClick={() => { setShowPopup(true); setPlanName('weight-loss') }}>
                  Start Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="card-container d-flex flex-column align-items-center mb-4">
          <div className="card-flip">
            <div className="card-inner">
              <div className="card front text-center p-4">
                <div className="outertext">
                  <h2>Casual</h2>
                </div>
              </div>
              <div className="card back text-center p-4 d-flex flex-column justify-content-between align-items-center">
                <img src={casualImage} alt="Casual" className="card-image" />
                <div>
                  <p>Details: Healthy habits</p>
                  <p>Difficulty: Beginner</p>
                  <p>Intensity: Low</p>
                </div>
                <Button onClick={() => { setShowPopup(true); setPlanName('casual') }}>
                  Start Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        <GeneratePlanPopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          planName={planName}
        />
      }
    </div>
  );
};
