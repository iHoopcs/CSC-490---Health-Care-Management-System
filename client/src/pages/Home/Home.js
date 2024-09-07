import SignupPopupButton from '../../components/signupPopupForm/SignupPopup'; 
import LoginPopupButton from '../../components/loginPopupForm/LoginPopup'; 
import './Home.css';

/**
  * The primary page of the application allowing the user to navigate
  * to all features of the web application
*/
function Home() {
  return (
    <div>
      <div className='registration'>
          <div className='row'>
            <SignupPopupButton />
          </div>

          <div className='row'>
            <LoginPopupButton />
          </div>
      </div>
      
    </div>
  );
}

export default Home;
