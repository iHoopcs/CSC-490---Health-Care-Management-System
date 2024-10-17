import React from 'react'
import './DashboardDisplayCard.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DashboardCard = (props) => {
  const {
    displayText,
    backgroundImgSrc,
    textColor,
    width,
    height,
    href
  } = props;

  const cardStyle = {
    width: width,
    height: height,
    textAlign: 'left',
    border: 'solid black 2px',
    backgroundImage: `url(${backgroundImgSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: textColor,
    padding: '20px',
  }

  //pass token and email to verify user to use /social --> send user object to create posts upon authorization
  const verifyUser = async () => {

    const token = localStorage.getItem('token'); //fetch user jwt for validation
    const userEmail = localStorage.getItem('userEmail');
    axios.get('http://localhost:8080/api/userData', {
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
          window.location.href = '/social'
        } else {
          console.log('An error occured')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {
        href === '/social'
          ?
          <a onClick={verifyUser}>
            <h6>{displayText}</h6>
            <div className='card' style={cardStyle}>
            </div>
          </a>
          :
          <a href={href} style={{ color: 'black' }}>
            <h6>{displayText}</h6>
            <div className='card' style={cardStyle}>
            </div>
          </a>
      }
    </>
  )
}
