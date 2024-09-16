import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export const WorkoutPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const generatePlanForDay = async (day) => {
      const response = await axios.post('http://localhost:8080/api/workout/plan', { userEmail, day });
      return { day, plan: response.data };
    };

    const getPlanDays = async () => {
      const response = await axios.post('http://localhost:8080/api/workout/userPreferences', { userEmail });
    }

    const generatePlans = async () => {
      const newPlans = new Array(days.length);
      for (let i = 0; i < days.length; i++) {
        const plan = await generatePlanForDay(days[i]);
        newPlans[i] = plan;
      }
      setPlans(newPlans);
      setLoading(false); // All plans have been generated
    };

    generatePlans();
  }, []);

  return (
    <Container>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">%</span>
        </div>
      )}
      {plans.map((plan, index) => (
        <Row key={index}>
          <Col>
            <h5>{plan.day}</h5>
            {plan.plan && plan.plan.exercises && plan.plan.exercises.map((exercise, i) => (
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
