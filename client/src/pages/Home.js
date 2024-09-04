import SignupPopupButton from '../components/popups/SignupPopup';
import './Home.css';

/**
  * The primary page of the application allowing the user to navigate
  * to all features of the web application
*/
function Home() {
  return (
    <div>
      <h1 className="text-center">Welcome to the Health Care Management Web App!</h1>
      <div className='registration'>
        <SignupPopupButton />
      </div>
    </div>
  );
}

export default Home;
