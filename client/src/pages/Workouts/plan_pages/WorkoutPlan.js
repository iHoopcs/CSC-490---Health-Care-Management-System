import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const WorkoutPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const generatePlans = async (userEmail) => {
    const response = await axios.post('http://localhost:8080/api/workout/plan', { userEmail });
    const allExercises = response.data.exercises;

    const newPlans = days.map(day => {
      const plan = { day, exercises: shuffleArray([...allExercises]) };
      return plan;
    });

    setPlans(newPlans);
    setLoading(false); // All plans have been generated
  };

  return (
    <Container>
      {loading && (
        <>
          <div className="spinner-border" role="status"></div>
          <span>Loading...</span>
        </>
      )}
      {!loading && plans.map((plan, index) => (
        <Row key={index}>
          <Col>
            <h5>{plan.day}</h5>
            {plan.exercises.map((exercise, i) => (
              <Row key={i}>
                <Col>{exercise.name}</Col>
              </Row>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  )
}
