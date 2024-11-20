import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { formatDate, getDaysFromDate, getDayOfWeek } from '../../../utility/dateUtils';

import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

export const WorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState('click an exercise');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const userEmail = localStorage.getItem('userEmail');
    generatePlans(userEmail);

    hasFetched.current = true;
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
    await axios.post('http://localhost:8080/api/workout/updatePlan', { userEmail });
    let newPlans = [];

    const currentRawDate = new Date();
    const currentDate = formatDate(currentRawDate);
    let futureDates = getDaysFromDate(currentDate, 7);

    for (let i = 0; i < futureDates.length; i++) {
      try {

        let workout = await axios.post('http://localhost:8080/api/workout/findWorkout',
          { userEmail: userEmail, date: futureDates[i] });

        if (workout != null) {
          newPlans.push(workout);
        }
      }
      catch (err) {
        console.error('Error fetching workout on date:', err);
      }
    }

    setPlans(newPlans);
    setLoading(false); // All plans have been generated
  };

  const regeneratePlans = async (userEmail) => {
    setLoading(true);
    setPlans([]);
    await axios.post('http://localhost:8080/api/workout/deletePlans', { userEmail: userEmail });
    await generatePlans(userEmail);
  }

  const AcceptPlan = async () => {
    window.location.href = '/dashboard'
  }

  return (
    <Container>
      <div className="d-flex justify-content-between mt-3 mb-4">
        <button onClick={() => regeneratePlans(localStorage.getItem('userEmail'))} type="button" className="btn btn-primary">Regenerate</button>
        <button onClick={AcceptPlan} type="button" className="btn btn-primary">Accept Plan</button>
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
                <h1 className="text-center">{getDayOfWeek(plan.data.date)}</h1>
                <table className="table table-striped table-hover">
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
                    {plan.data.exercises.map((exercise, i) => (
                      <tr
                        key={i}
                        onClick={() => setInstructions(exercise.instructions)}
                      >
                        <th scope="row"></th>
                        <td>{exercise.name}</td>
                        <td>{exercise.duration > 0 ? `${exercise.duration} minutes` : `${exercise.reps} reps`}</td>
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
