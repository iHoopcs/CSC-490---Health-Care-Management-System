import React from 'react'
import { Container, Navbar, Nav  } from 'react-bootstrap'

export const TopNavBar = () => {
  return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top" className=" py-4 navbar-header"> 
                <Container >
                    <Navbar.Brand>NutriFitHealth</Navbar.Brand>

                    <Nav>
                        <Nav.Link>Learn Fitness & Nutrition</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
  )
}
