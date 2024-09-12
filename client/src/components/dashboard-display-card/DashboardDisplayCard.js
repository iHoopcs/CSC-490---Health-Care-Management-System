import React from 'react'
import './DashboardDisplayCard.css'; 

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
    padding: '10px', 
    border: 'solid black 2px', 
    backgroundImage: `url(${backgroundImgSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: textColor,
    padding: '20px'
  }

  return (
    <>  
      <a href={href}>
        <div className='card' style={cardStyle}>
            <h5>{displayText}</h5>
        </div>
      </a>
          
    </>
  )
}
