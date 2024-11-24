import React, { useState, useEffect } from 'react'
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
  const [hasPlan, setHasPlan] = useState(false);

  //used to ensure a plan has been searched for before rendering the workouts and nutrition links
  const [checkedForPlan, setCheckedForPlan] = useState(false);

  const handleNoSignout = () => {
    setSignoutModalVisible(false);
  }

  const handleYesSignout = () => {
    localStorage.clear();
    window.location.href = '/'
  }

  //use jwt to validate user request to profile data --> GET request to /api/profile
  const handleViewProfile = () => {
    console.log('Request sent')
    const token = localStorage.getItem('token'); //fetch user jwt for validation
    const userEmail = localStorage.getItem('userEmail');
    const PROD_API = "https://csc490-nutrifit-server.vercel.app/";
    axios.get(PROD_API + 'api/userData', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-User-Email': userEmail,
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          sessionStorage.setItem('userProfileData', JSON.stringify(response.data.user))
          window.location.href = '/profile'
        } else {
          console.log('An error occured')
        }
      })
      .catch(err => console.log(err))

  }
  // find if the user has a plan for workout's and nutrition
  const userHasPlan = async () => {
    const userEmail = localStorage.getItem('userEmail');

    try {
      const PROD_API = "https://csc490-nutrifit-server.vercel.app/";
      const response = await axios.post(PROD_API + 'api/workout/userPreferences',
        { params: { userEmail: userEmail } });

      const plan = response.data.workoutPlan;
      console.log(plan);

      if (plan != null) {
        setHasPlan(true);
        console.log('User does have a plan')
      }
      else {
        setHasPlan(false);
        console.log('User does not have a plan')
      }

    }
    catch (error) {
      console.log(error)
    }

    setCheckedForPlan(true);
  }

  useEffect(() => {
    userHasPlan();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='bg-light col-auto col-md-3 min-vh-100 w-100 border p-4'>
          <ul className="nav flex-column mt-2">
            <li className=" fs-3 mb-4">
              <button className='btn btn-primary' disabled={!checkedForPlan}>
                <a href={hasPlan ? "/workouts/day" : "/workouts"} className="nav-link text-dark">
                  <GiWeightLiftingUp />
                  <span className='ms-2'>Workouts</span>
                </a>
              </button>
            </li>

            <li className="nav-item fs-3 mb-4">
              <button className='btn btn-primary' disabled={!checkedForPlan}>
                <a href={hasPlan ? "/nutrition" : "/workouts"} className="nav-link text-dark">
                  <GiFruitBowl />
                  <span className='ms-2'>Nutrition</span>
                </a>
              </button>
            </li>

            <li className="nav-item fs-3">
              <button className='btn btn-primary' disabled={!checkedForPlan}>
                <a href="/calendar" className="nav-link text-dark" aria-current="page">
                  <IoCalendarSharp />
                  <span className='ms-2'>Calendar</span>
                </a>
              </button>
            </li>

            <ul className="nav">
              <li className="nav-item fs-4 fixed-bottom mb-5 mx-4">
                <Dropdown className="dropup">
                  <Dropdown.Toggle variant="primary" className="text-dark">
                    <CgProfile />
                    <span className="ms-2">Profile</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><button className='btn btn-outline-primary' onClick={() => { handleViewProfile() }}>View Profile</button></Dropdown.Item>
                    <Dropdown.Item as="button"><button className='btn btn-outline-danger' onClick={() => { setSignoutModalVisible(true) }}>Logout</button></Dropdown.Item>
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
