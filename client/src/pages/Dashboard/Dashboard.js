import React, { useState, useEffect } from 'react'
import { SideBar } from '../../components/dashboard-sidebar/SideBar.js'; 


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
          </div>
        </div>
      </div>
      
    </div>
      
    </>
  )
}
