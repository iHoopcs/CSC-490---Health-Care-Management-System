import Popup from "../components/Popup"
import { useState } from 'react';

function TestPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>User Login</button>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <span>Username: </span>
        <input type="text" value={username}
          onChange={e => setUsername(e.target.value)} />
        <span>Password: </span>
        <input type="text" value={password}
          onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={() => submitCredentials()}>Login</button>
      </Popup>
    </div>
  );

  /**
    * This function attemps submitting the user's credentials when
    * they are ready to log in and should authenticate those credentials
    * before giving the user access
    */
  function submitCredentials() {
    console.log("username: " + username);
    console.log("password: " + password);
  }
}

export default TestPage;
