import Popup from "../popups/Popup"
import { useState } from 'react';
import './SignupPopup.css';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

/**
 * Returns a component that display the sign up pop up, includes interaction
 * with the database and authentication
 */
function SignupPopup() {
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState([]);


  return (
    <div>
      <button onClick={() => setShowSignupPopup(true)} data-testid="signup-1" className="btn btn-primary mb-5 text-white">Signup</button>
      <Popup trigger={showSignupPopup} setTrigger={setShowSignupPopup}>
        <div className="input-fields mt-4">
          <div className="group">
            <label>Email: </label>
            <input type="email" value={email} placeholder="example@site.com"
              className={submissionAttempted && !validateEmail(email)
                ? 'invalid-input' : ''}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="group">
            <span>Password: </span>
            <div className='password-input'>
              <input type={passType} value={password}
                className={submissionAttempted && !validatePassword(password)
                  ? 'invalid-input' : ''}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="icon-span" onClick={togglePasswordVisable}>
                <Icon className="icon-input" icon={icon} size={25} />
              </span>
            </div>
          </div>
          <div className="group">
            <span>First Name: </span>
            <input type="text" value={firstName}
              className={submissionAttempted && !validateName(firstName)
                ? 'invalid-input' : ''}
              onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="group">
            <span>Last Name: </span>
            <input type="text" value={lastName}
              className={submissionAttempted && !validateName(lastName)
                ? 'invalid-input' : ''}
              onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="group">
            <span>Account Name:</span>
            <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} />
          </div>
          <div className="group">
            <span>Age: </span>
            <input type="number" value={age} placeholder="years"
              className={submissionAttempted && !validateAge(age)
                ? 'invalid-input' : ''}
              onChange={e => setAge(e.target.value)} />
          </div>
          <div className="group">
            <span>Height: </span>
            <input type="number" value={height} placeholder="cm"
              className={submissionAttempted && !validateHeight(height)
                ? 'invalid-input' : ''}
              onChange={e => setHeight(e.target.value)} />
          </div>
          <div className="group mb-4">
            <span>Weight: </span>
            <input type="number" value={weight} placeholder="lbs"
              className={submissionAttempted && !validateWeight(weight)
                ? 'invalid-input' : ''}
              onChange={e => setWeight(e.target.value)} />
          </div>
          <button onClick={() => submitSignupInformation()} className="btn btn-primary w-100">Signup</button>

          {submissionErrors.length > 0 && (
            <div>
              <h4>Please fix the following</h4>
              <ul className="warning">
                {submissionErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );

  function togglePasswordVisable() {
    if (passType === 'password') {
      setIcon(eye);
      setPassType('text')
    } else {
      setIcon(eyeOff)
      setPassType('password')
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const hasEightOrMoreCharacters = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return hasEightOrMoreCharacters && hasNumber && hasSpecialChar;
  }

  function validateName(name) {
    return name.trim() !== '';
  }

  function validateAge(age) {
    return age > 0;
  }

  function validateHeight(value) {
    return value > 0;
  }
  function validateWeight(value) {
    return value > 0;
  }

  /**
   * Find submission errors if any so the user can be notified of any mistakes
   * in thier submission
  */
  function findSubmissionErrors(email, password, firstName, lastName, age, height, weight) {
    const newSubmissionErrors = [];

    if (!validateEmail(email)) {
      newSubmissionErrors.push('Invalid email address. follow format example@email.com');
    }
    if (!validatePassword(password)) {
      newSubmissionErrors.push('Password must be at least 8 characters long,'
        + ' have at least one number, and a special character');
    }
    if (!validateName(firstName)) {
      newSubmissionErrors.push('First name cannot be empty');
    }
    if (!validateName(lastName)) {
      newSubmissionErrors.push('Last name cannot be empty');
    }
    if (!validateAge(age)) {
      newSubmissionErrors.push('Age must be a positive integer');
    }
    if (!validateHeight(height)) {
      newSubmissionErrors.push('Height must be a positive number');
    }
    if (!validateWeight(weight)) {
      newSubmissionErrors.push('Weight must be a positive number');
    }

    return newSubmissionErrors;
  }


  /**
    * submits user's registration information and validates the information
    * before creating a new user
  */
  async function submitSignupInformation() {
    setSubmissionAttempted(true);

    //Validate the user's information as valid
    const newSubmissionErrors =
      findSubmissionErrors(
        email, password, firstName, lastName, age, height, weight);

    setSubmissionErrors(newSubmissionErrors);

    if (newSubmissionErrors.length > 0) {
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      height: height,
      weight: weight,
      age: age,
      password: password,
      email: email,
      accountName: accountName
    };

    try {
      const PROD_API = "https://csc490-nutrifit-server.vercel.app/"; 
      
      const response = await axios.post(PROD_API + 'api/auth/signup', newUser);
      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSubmissionErrors(['account with this email already exists']);
      }
      else {
        setSubmissionErrors(['failed sending info']);
      }
      console.log(error);
      return;
    }

    setShowSignupPopup(false);
  }
}

export default SignupPopup;
