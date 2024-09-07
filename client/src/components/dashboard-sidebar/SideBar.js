import React, { useState } from 'react'
import './SideBar.css'; 
import { GiWeightLiftingUp, GiFruitBowl } from "react-icons/gi";
import { IoCalendarSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 

export const SideBar = (props) => {

    const [signoutModalVisible, setSignoutModalVisible] = useState(false); 

    const handleNoSignout = () => {
        setSignoutModalVisible(false); 
    }

    const handleYesSignout = () => {
        localStorage.clear(); 
        window.location.href = '/'
    }

    //use jwt to validate user request to profile data --> GET request to /api/profile
    const handleViewProfile =() => {
        console.log('Request sent')
        const token = localStorage.getItem('token'); //fetch user jwt for validation
        const userEmail = localStorage.getItem('userEmail'); 
        axios.get('http://localhost:8080/api/userData', {
            headers: {
                'Authorization': `Bearer ${token} ${userEmail}`,
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch(err => console.log(err))

    }
  return (
    <>
            <div className='row'>
                <div className='bg-light col-auto col-md-3 min-vh-100 w-100 border p-4'>

                    <ul className="nav flex-column mt-2">
                        <li className=" fs-3 mb-4">
                            <button className='btn btn-outline-secondary'>
                                <a href="/workouts" className="nav-link text-dark">
                                    <GiWeightLiftingUp />
                                    <span className='ms-2'>Workouts</span>
                                </a>
                            </button>
                            
                        </li>

                        <li className="nav-item fs-3 mb-4">
                            <button className='btn btn-outline-secondary'>
                                <a href="/nutrition" className="nav-link text-dark" aria-current="page">
                                    <GiFruitBowl />
                                    <span className='ms-2'>Nutrition</span>
                                </a>
                            </button>
                        </li>

                        <li className="nav-item fs-3">
                            <button className='btn btn-outline-secondary'>
                                <a href="/nutrition" className="nav-link text-dark" aria-current="page">
                                    <IoCalendarSharp />
                                    <span className='ms-2'>Calendar</span>
                                </a>
                            </button>
                        </li>
                        
                        <ul className="nav">
                            <li className="nav-item fs-4 fixed-bottom mb-5 mx-4">
                                <Dropdown className="dropup">
                                <Dropdown.Toggle variant="outline-secondary" className="text-dark">
                                    <CgProfile />
                                    <span className="ms-2">Profile</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><button className='btn btn-outline-primary' onClick={() => {handleViewProfile()}}>View Profile</button></Dropdown.Item>
                                    <Dropdown.Item as="button"><button className='btn btn-outline-danger' onClick={() => {setSignoutModalVisible(true)}}>Logout</button></Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>

                        {/*Profile Signout Popup Modal*/}
                        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered show={signoutModalVisible}>
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                                    Are you sure you want to sign out?
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Row className='w-100 justify-content-around'>
                                    <Col>
                                        <Button onClick={handleNoSignout} className='w-100'>No</Button>
                                    </Col>

                                    <Col>
                                        <Button onClick={handleYesSignout} className='w-100'>Yes</Button>
                                    </Col>
                                </Row>
                            </Modal.Footer>
                        </Modal>



                    </ul>
                </div>
            </div>
        
    </>
  )
}
