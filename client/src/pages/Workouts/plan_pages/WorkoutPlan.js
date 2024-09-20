import React, { useEffect, useState } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

export const WorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState('click an exercise');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    generatePlans(userEmail);
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkAvalibleDays = async (email) => {
    try {
      const response = await axios.get('http://localhost:8080/api/workout/userPreferences',
        { params: { userEmail: email } });

      let days = response.data.workoutSchedule;

      const weekOrder = ['monday', 'tuesday', 'wednesday',
        'thursday', 'friday', 'saturday', 'sunday'];

      days = days.sort((a, b) =>
        weekOrder.indexOf(a) - weekOrder.indexOf(b));

      return days;
    } catch (error) {
      console.error(`Error fetching user preferences: ${error}`);
      return null;
    }
  }

  const generatePlans = async (userEmail) => {
    const response = await axios.post('http://localhost:8080/api/workout/plan', { userEmail });
    const allExercises = response.data.exercises;

    const days = await checkAvalibleDays(userEmail);

    const newPlans = days.map(day => {
      const plan = { day, exercises: shuffleArray([...allExercises]) };
      return plan;
    });

    setPlans(newPlans);
    setLoading(false); // All plans have been generated
  };

  const AcceptPlan = () => {
    //TODO: Once calendar impemented push workkout to calandar

    window.location.href = '/dashboard'
  }



  return (
    <Container>
      <div className="d-flex justify-content-between mt-3 mb-4">
        <button onClick={() => generatePlans(localStorage.getItem('userEmail'))} type="button" className="btn btn-success">Regenerate</button>
        <button onClick={AcceptPlan} type="button" className="btn btn-success">Accept Plan</button>
      </div>
      {
        loading && (
          <>
            <div className="spinner-border" role="status"></div>
            <span>Generating your plan...</span>
            <div className="spinner-border" role="status"></div>
          </>
        )
      }
      <Row className="w-100">
        <Col md={6}>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {plans.map((plan, index) => (
              <div key={index} className="pb-2 mb-3 border-bottom">
                <h1 className="text-center">{plan.day}</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <FontAwesomeIcon icon={faDumbbell} />
                      </th>
                      <th scope="col">Exercise</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Muscle-Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.exercises.map((exercise, i) => (
                      <tr
                        key={i}
                        onClick={() => setInstructions(exercise.instructions)}
                      >
                        <th scope="row"></th>
                        <td>{exercise.name}</td>
                        <td>{`${exercise.duration} minutes`}</td>
                        <td>{exercise.muscle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Col >
        <Col md={2}>
        </Col>
        <Col md={4}>
          <div className="pb-2 mb-3 border-bottom">
            <h1 className="text-center">Exercise Instructions</h1>
          </div>
          <div className="p-3 m-3 bg-light rounded" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <p className="h5">{instructions}</p>
          </div>
        </Col>
      </Row>
    </Container >
  )
}
