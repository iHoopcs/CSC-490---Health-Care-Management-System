import Popup from "./Popup"
import { useState } from 'react';
import './SignupPopupButton.css';

/**
 * Returns a component that display the sign up pop up, includes interaction 
 * with the database and authentication
 */
function SignupPopupButton() {
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <div>
      <button onClick={() => setShowSignupPopup(true)}>User Signup</button>
      <Popup trigger={showSignupPopup} setTrigger={setShowSignupPopup}>
        <div className="input-fields">
          <span>New Username: </span>
          <input type="text" value={newUsername}
            onChange={e => setNewUsername(e.target.value)} />
          <span>New Password: </span>
          <input type="password" value={newPassword}
            onChange={e => setNewPassword(e.target.value)} />
          <span>Email: </span>
          <input type="email" value={email} placeholder="example@site.com"
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
          <div className="multi-field">
            <input type="number" value={heightFeet} placeholder="ft"
              onChange={e => setHeightFeet(e.target.value)} />
            <input type="number" value={heightInches} placeholder="in"
              onChange={e => setHeightInches(e.target.value)} />
          </div>
          <span>Weight: </span>
          <input type="number" value={weight} placeholder="lbs"
            onChange={e => setWeight(e.target.value)} />
          <br />
          <button onClick={() => submitSignupInformation()}>Signup</button>
        </div>
      </Popup>
    </div>
  );

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
    console.log("height: " + heightFeet + "ft" + heightInches + "in");
    console.log("weight: " + weight);

    //TODO: Create a new user
  }
}

export default SignupPopupButton;
