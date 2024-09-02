import Popup from "../components/Popup"
import { useState } from 'react';

/**
 * This page is used to test out new features before putting them
 * on primary pages
 */
function TestPage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <div>
      <button onClick={() => setShowLoginPopup(true)}>User Login</button>
      <Popup trigger={showLoginPopup} setTrigger={setShowLoginPopup}>
        <span>Username: </span>
        <input type="text" value={username}
          onChange={e => setUsername(e.target.value)} />
        <span>Password: </span>
        <input type="text" value={password}
          onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={() => submitLoginCredentials()}>Login</button>
      </Popup>

      <button onClick={() => setShowSignupPopup(true)}>User Signup</button>
      <Popup trigger={showSignupPopup} setTrigger={setShowSignupPopup}>
        <span>New Username: </span>
        <input type="text" value={newUsername}
          onChange={e => setNewUsername(e.target.value)} />
        <span>New Password: </span>
        <input type="password" value={newPassword}
          onChange={e => setNewPassword(e.target.value)} />
        <span>Email: </span>
        <input type="email" value={email}
          onChange={e => setEmail(e.target.value)} />
        <span>First Name: </span>
        <input type="text" value={firstName}
          onChange={e => setFirstName(e.target.value)} />
        <span>Last Name: </span>
        <input type="text" value={lastName}
          onChange={e => setLastName(e.target.value)} />
        <span>Age: </span>
        <input type="number" value={age}
          onChange={e => setAge(e.target.value)} />
        <span>Height: </span>
        <input type="number" value={height}
          onChange={e => setHeight(e.target.value)} />
        <span>Weight: </span>
        <input type="number" value={weight}
          onChange={e => setWeight(e.target.value)} />
        <br />
        <button onClick={() => submitSignupInformation()}>Signup</button>
      </Popup>
    </div>
  );

  /**
    * submits the user's credentials, authenticates them, and 
    * logs the user in
  */
  function submitLoginCredentials() {
    //TODO: Authenticate the user's credentials

    console.log("username: " + username);
    console.log("password: " + password);
  }

  /** 
    * submits user's registration information and validates the information 
    * before creating a new user
  */
  function submitSignupInformation() {
    //TODO: Validate the user's information as valid 

    console.log("username: " + newUsername);
    console.log("password: " + newPassword);
    console.log("email: " + email);
    console.log("first name: " + firstName);
    console.log("last name: " + lastName);
    console.log("age: " + age);
    console.log("height: " + height);
    console.log("weight: " + weight);

    //TODO: Create a new user
  }
}

export default TestPage;
