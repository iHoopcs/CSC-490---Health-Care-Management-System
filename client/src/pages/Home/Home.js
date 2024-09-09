import SignupPopupButton from '../../components/signupPopupForm/SignupPopup'; 
import LoginPopupButton from '../../components/loginPopupForm/LoginPopup'; 
import './Home.css';
import { useEffect, useState } from 'react';

/**
  * The primary page of the application allowing the user to navigate
  * to all features of the web application
*/
function Home() {
  const images = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'] //background image styles pointing to image url 
  const intervalCycle = 6000; //6 seconds - in milliseconds

  const [background, setBackground] = useState(images[0])
  const [imageIndex, setImageIndex] = useState(0); 

  //change the background image every 5 seconds - cycle through images array
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setBackground(images[newIndex]);
        return newIndex;
      });
    }, intervalCycle);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`bg-container ${background}`}>
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
