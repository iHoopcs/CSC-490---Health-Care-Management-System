import React, { useState, useEffect } from 'react'
import { SideBar } from '../../components/dashboard-sidebar/SideBar.js';
import { DashboardCard } from '../../components/dashboard-display-card/DashboardDisplayCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';


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
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div className='row w-100'>
          <div className='col-sm-auto'>
            <SideBar />
          </div>

          <div className='col-sm'>
            <div className='container-fluid p-4'>
              <div className='d-flex justify-content-between'>
                <h4>{userGreeting}</h4>
                <h4>{todayDate}</h4>
              </div>
            </div>

            {/*Dashboard display cards*/}
            <div className='row w-100 h-100 g-5'>
              <div className='col-sm-7 h-100 '>
                <DashboardCard
                  displayText=""
                  backgroundImgSrc="https://www.citypng.com/public/uploads/preview/hd-2023-september-black-calendar-png-704081694602999rmnejirv5i.png"
                  href="/calendar"
                  textColor="black"
                  width="40vw"
                  height="60vh" />
              </div>
              <div className='col-sm h-100'>
                <div className='row w-100 h-50'>
                  <DashboardCard
                    displayText="Want to connect with others?"
                    backgroundImgSrc="https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-6.jpg"
                    href="/social"
                    textColor="black"
                    width="25vw"
                    height="20vh"
                  />
                  <br></br>
                  <DashboardCard
                    displayText="Test your knowledge of fitness and nutrition!"
                    backgroundImgSrc="https://d1c337161ud3pr.cloudfront.net/files%2F37cc6b20-de9e-46c0-81d0-178afe222946_Games%20for%20Learning.png"
                    href="/learning-game"
                    textColor="black"
                    width="25vw"
                    height="20vh"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
