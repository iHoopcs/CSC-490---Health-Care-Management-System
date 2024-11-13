import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar.js';
import { formatDate, getDaysFromDate, getDayOfWeek } from '../../../utility/dateUtils';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const WorkoutDay = () => {
  const [plans, setPlans] = useState([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState([]);
  const [instructions, setInstructions] = useState('click an exercise');
  const [loading, setLoading] = useState(true);
  const [muscle, setMuscle] = useState('camera');
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;

      const userEmail = localStorage.getItem('userEmail');
      await generatePlans(userEmail);
      getTodaysPlan();

      hasFetched.current = true;
    };

    fetchData();
  }, [plans]);

  useEffect(() => {
    if (plans.length > 0) {
      getTodaysPlan();
    }
  }, [plans]);

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
    }
  }

  const getTodaysPlan = () => {
    setCurrentPlanIndex(0);

    for (const plan in plans) {
      console.log(plans[plan].data.date);

      if (plans[plan].data.date == formatDate(new Date())) {
        setCurrentPlanIndex(plan);
      }
    }

    if (plans.length > 0) {
      setLoading(false);
      console.log("chosen: " + plans[currentPlanIndex].data.date);
    }
  }

  const getPreviousPlan = () => {
    setCurrentPlanIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // or handle the case when there is no previous plan
    });
  }

  const getNextPlan = () => {
    setCurrentPlanIndex((prevIndex) => {
      if (prevIndex < plans.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex; // or handle the case when there is no next plan
    });
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
                  <Row className="mt-4">
                    <Col>
                      <Button variant="primary" onClick={() => { getPreviousPlan() }}>
                        &lt;
                      </Button>
                    </Col>
                    <Col>
                      <h3 className="ml-3">{plans[currentPlanIndex].data.date}</h3>
                    </Col>
                    <Col>
                      <Button variant="primary" onClick={() => { getNextPlan() }}>
                        &gt;
                      </Button>
                    </Col>
                  </Row>
                  <div style={{ width: "40vw", maxHeight: '600px', paddingRight: '4px' }}>
                    <div className="pb-3 mt-3 border-bottom">
                      <h1 className="text-center">{getDayOfWeek(plans[currentPlanIndex].data.date) + "'s workout"}</h1>
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
                          {plans[currentPlanIndex].data.exercises.map((exercise, i) => (
                            <tr
                              key={i}
                              onClick={() => {
                                setInstructions(exercise.instructions);
                                setMuscle(exercise.muscle)
                              }}
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
                  </div>
                </Col>
                <Col className="gx-5" sm="auto">
                  <Row className='w-100'>
                    <Row className="justify-content-center">
                      <div className="text-center mt-4">
                        <img
                          src={"/" + muscle + ".jpg"}
                          alt="muscle group not found"
                          style={{
                            maxWidth: '300px',
                            maxHeight: '150px'
                          }}
                        />
                        <p
                          className="h5"
                        >
                          {muscle !== 'camera'
                            ? `muscle group: ${muscle}`
                            : 'click exercise to view muscle group'}
                        </p>
                      </div>
                    </Row>
                  </Row>
                  <Row>
                    <div style={{ width: "40vw" }}>
                      <div className="pb-2 mt-3 border-bottom">
                        <h2 className="text-center">Exercise Instructions</h2>
                      </div>
                      <div className="p-3 m-3 bg-light rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <p className="h5">{instructions}</p>
                      </div>
                    </div>
                  </Row>
                </Col>
              </>
            )
        }
      </Row>
    </div>
  );
}
