import React from 'react'

export const DashboardCard = (props) => {
  const { displayText, backgroundImgSrc, textColor, width, height } = props; 
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
        <div className='card' style={cardStyle}>
            <h5>{displayText}</h5>
        </div>
    </>
  )
}
