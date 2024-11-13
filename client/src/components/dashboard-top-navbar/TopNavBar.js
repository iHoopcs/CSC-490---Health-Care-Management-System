import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

export const TopNavBar = () => {
  let message = localStorage.getItem('msg');
  if (message) {
    message = message.replace('Welcome', '').replace(/!/g, '').trim();
    message = `Current User: ${message}`;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className=" py-4 navbar-header">
        <Container >
          <Navbar.Brand href='/dashboard'>NutriFitHealth</Navbar.Brand>
          <Nav>
            <Nav.Link>
              Learn Fitness & Nutrition
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/profile" className="navbar-text">{message}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
