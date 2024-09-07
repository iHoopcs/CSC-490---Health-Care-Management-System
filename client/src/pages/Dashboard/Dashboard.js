import React, { useState, useEffect } from 'react'
import { SideBar } from '../../components/dashboard-sidebar/SideBar.js'; 


export const Dashboard = () => {
  const [userGreeting, setUserGreeting] = useState(''); 
  const fetchGreeting = () => {
    setUserGreeting(localStorage.getItem('msg'))
  }

  useEffect(() => {
    fetchGreeting()
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
            <h4>{userGreeting}</h4>
          </div>
        </div>
      </div>
      
    </div>
      
    </>
  )
}
