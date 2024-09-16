import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const WorkoutPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Container>
      {days.map((day, index) => (
        <Row key={index}>
          <Col>
            <h5>{day}</h5>
            <p>Workout plan for {day}</p>
          </Col>
        </Row>
      ))}
    </Container>
  )
}
