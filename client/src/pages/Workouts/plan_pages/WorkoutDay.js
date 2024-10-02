import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar.js';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const WorkoutDay = () => {
  const [dayPlan, setDayPlan] = useState(null);
  const [instructions, setInstructions] = useState('click an exercise');
  const [loading, setLoading] = useState(true);

  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const today = new Date().getDay();
  const currentDay = days[today];

  const getTodaysPlan = async () => {
    const email = localStorage.getItem('userEmail');
    let currentDate = new Date();

    for (let i = 0; i < 7; i++) {
      let nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      let formattedDate = nextDate.toISOString().split('T')[0];

      const day = days[nextDate.getDay()];

      console.log(email);
      console.log(formattedDate);

      try {

        const response = await axios.post('http://localhost:8080/api/workout/findWorkout',
          { userEmail: email, date: formattedDate });

        if (response.status === 200 && response.data) {
          console.log('workout found on date: ' + formattedDate);

          setDayPlan(
            {
              day: day,
              exercises: response.data.exercises,
              complete: response.data.completion,
            }
          );

          setLoading(false);
          console.log("dayplans day: " + dayPlan.day);
        }
      }
      catch (error) {
        console.log('no workout found on date: ' + formattedDate);
      }

      if (dayPlan != null) {
        break;
      }
    }
  }

  useEffect(() => {
    getTodaysPlan();
  }, []);

  return (
    <Container className='container-fluid' style={{ width: '100%', height: '100vh', margin: '0', padding: '0' }}>
      <Row className="w-100 noGutters">
        <Col md={3}>
          <SideBar />
        </Col>
        {
          loading ? (
            <>
              <Col md={3}>
                <div className="spinner-border" role="status"></div>
                <span>Finding Next Workout day...</span>
                <div className="spinner-border" role="status"></div>
              </Col>
            </>
          ) :
            (
              <>
                <Col md={4}>
                  <div className="pb-2 mb-3 border-bottom">
                    <h1 className="text-center">
                      {dayPlan.day === new Date().toLocaleString('en-us', { weekday: 'long' })
                        ? "Today's Plan"
                        : dayPlan.day}
                    </h1>
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
                        {dayPlan.exercises.map((exercise, i) => (
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
                </Col>
                <Col md={1}>
                </Col>
                <Col md={4}>
                  <div className="pb-2 mb-3 border-bottom">
                    <h1 className="text-center">Exercise Instructions</h1>
                  </div>
                  <div className="p-3 m-3 bg-light rounded" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <p className="h5">{instructions}</p>
                  </div>
                </Col>
              </>
            )
        }
      </Row>
    </Container >
  );
}

