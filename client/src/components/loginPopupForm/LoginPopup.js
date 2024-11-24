// src/Login.js
import React, { useState } from 'react';
import './LoginPopup.css';
import Popup from '../popups/Popup'
import axios from 'axios'


/**
 * Creates a login for the user
 * @returns The sign up component 
 */

function LoginPopup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password
    }

    try {
      const PROD_API = "https://csc490-nutrifit-server.vercel.app/";
      const response = await axios.post(PROD_API + 'api/auth/login', loginData);
      console.log('Login successful:', response.data);
      //redirect to platform page - with user welcome greeting
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('msg', response.data.msg)
      localStorage.setItem('userEmail', response.data.userEmail)
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        setSubmissionErrors(['Invalid email or password']);
      } else {
        setSubmissionErrors(['An error occurred during login']);
      }
    }
  };


  return (

    // Login box
    <div>
      <button onClick={() => setShowSignupPopup(true)} data-testid="Login" className="btn btn-primary text-white">Login</button>

      <Popup trigger={showSignupPopup} setTrigger={setShowSignupPopup}>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputContainer">
            <label htmlFor="email" className="label">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password" className="label">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {
          submissionErrors.length > 0
            ?
            <>
              <h5 className='mt-3 mx-3'>Please fix the following</h5>
              <ul className='warning'>
                {
                  submissionErrors.map((err, index) => {
                    return <li key={index} className='mx-3'>{err}</li>
                  })
                }
              </ul>
            </>
            : ''
        }
      </Popup>
    </div>
  );

}

export default LoginPopup;
