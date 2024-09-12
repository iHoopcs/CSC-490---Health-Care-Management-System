import React, { useState, useEffect } from 'react'
import { SideBar } from '../../components/dashboard-sidebar/SideBar.js'; 
import { DashboardCard } from '../../components/dashboard-display-card/DashboardDisplayCard.js';


export const Dashboard = () => {
  const [todayDate, setTodayDate] = useState('')
  const [userGreeting, setUserGreeting] = useState(''); 
  const fetchGreeting = () => {
    setUserGreeting(localStorage.getItem('msg'))
  }
  const getTodaysDate = () => {
    const timeElapsed = Date.now(); 
    const today = new Date(timeElapsed)
    setTodayDate(today.toDateString())
  }

  useEffect(() => {
    fetchGreeting()
    getTodaysDate()
  },[])
  return (
    <>
    <div className='container-fluid'>
      <div className='row w-100'>
        <div className='col-sm-auto'>
          <SideBar />

        </div>

        <div className='col'>
          <div className='container-fluid p-4'>
            <div className='d-flex justify-content-between'>
              <h4>{userGreeting}</h4>
              <h4>{todayDate}</h4>
            </div>

            {/*Dashboard display cards*/}
            <div className='mt-5'>
              <div className='row w-100 justify-content-between'>
                <div className='col-sm-auto'>
                  <DashboardCard displayText="" backgroundImgSrc="https://www.citypng.com/public/uploads/preview/hd-2023-september-black-calendar-png-704081694602999rmnejirv5i.png" textColor="black" width="50vw" height="60vh"/>
                </div>

                <div className='col-sm-auto'>
                  <div className='row mb-5'>
                    <DashboardCard displayText="Want to connect with others?" backgroundImgSrc="https://cdn5.vectorstock.com/i/1000x1000/62/54/social-chat-logo-vector-31826254.jpg" textColor="black" width="25vw" height="20vh"/>
                  </div>

                  <div className='row'>
                    <DashboardCard displayText="Test your knowledge of fitness and nutrition!" backgroundImgSrc="https://d1c337161ud3pr.cloudfront.net/files%2F37cc6b20-de9e-46c0-81d0-178afe222946_Games%20for%20Learning.png" textColor="white" width="25vw" height="20vh"/>
                  </div>
                </div>
              </div>
              

              
            </div>
          </div>
        </div>
      </div>
      
    </div>
      
    </>
  )
}
