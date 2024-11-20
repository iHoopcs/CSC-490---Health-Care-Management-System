import React from 'react'
import { Container, Navbar, Nav  } from 'react-bootstrap'

export const TopNavBar = () => {
  return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top" className=" py-4 navbar-header"> 
                <Container >
                    <Navbar.Brand href='/dashboard'>NutriFitHealth</Navbar.Brand>

                    <Nav>
                        <Nav.Link href='/learning-info'>Learn Fitness & Nutrition</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
  )
}
