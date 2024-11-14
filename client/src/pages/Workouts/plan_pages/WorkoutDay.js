import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar.js';
import { formatDate, getDaysFromDate, getDayOfWeek } from '../../../utility/dateUtils';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const WorkoutDay = () => {
  const [plans, setPlans] = useState([]);
  const [instructions, setInstructions] = useState('click an exercise');
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const userEmail = localStorage.getItem('userEmail');
    generatePlans(userEmail);

    hasFetched.current = true;
  }, []);

  const generatePlans = async (userEmail) => {
    try {
      await axios.post('http://localhost:8080/api/workout/updatePlan', { userEmail });
      let newPlans = [];

      const currentRawDate = new Date();
      const currentDate = formatDate(currentRawDate);
      let futureDates = getDaysFromDate(currentDate, 7);

      for (let i = 0; i < futureDates.length; i++) {
        try {
          let workout = await axios.post('http://localhost:8080/api/workout/findWorkout', {
            userEmail: userEmail,
            date: futureDates[i]
          });

          if (workout != null) {
            newPlans.push(workout);
          }
        } catch (error) {
          console.error(`Error fetching workout for date ${futureDates[i]}:`, error);
        }
      }

      setPlans(newPlans);
    } catch (error) {
      console.error('Error updating workout plan:', error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='container-fluid' style={{ width: '100vw', height: '100vh', margin: '0', padding: '0' }}>
      <Row className="w-100">
        <Col sm="auto">
          <SideBar />
        </Col>
        {
          loading ? (
            <>
              <Col md={5}>
                <div className="spinner-border" role="status"></div>
                <span>Finding workouts week in advance...</span>
                <div className="spinner-border" role="status"></div>
              </Col>
            </>
          ) :
            (
              <>
                <Col className="gx-5" sm="auto">
                  <div style={{ width: "40vw", maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
                    {plans.map((plan, index) => (
                      <div key={index} className="pb-3 mt-3 border-bottom">
                        <h1 className="text-center">{getDayOfWeek(plan.data.date) + "'s workout"}</h1>
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
                </Col>
                <Col className="gx-1" sm="auto">
                  <div style={{ width: "35vw" }}>
                    <div className="pb-2 mt-3 border-bottom">
                      <h1 className="text-center">Exercise Instructions</h1>
                    </div>
                    <div className="p-3 m-3 bg-light rounded" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                      <p className="h5">{instructions}</p>
                    </div>
                  </div>
                </Col>
              </>
            )
        }
      </Row>
    </div>
  );
}
