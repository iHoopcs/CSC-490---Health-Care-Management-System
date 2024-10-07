import React from 'react'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar'
import './LearningGame.css'; 

export const LearningGame = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row w-100' style={{ height: '100vh' }}>
          <div className='col-sm-auto'>
              <SideBar />
          </div>

          <div className='col d-flex justify-content-center align-items-center'>
            <div className='row'>
              <div className='col'>
                <div className='card-style border shadow-lg p-4 rounded' 
                style={{
                  backgroundImage:`url('https://images.wakelet.com/resize?id=t4_tr3NIzXzG1VD4Bnu6H&h=2880&w=3840&q=85')`,
                  }}>
                </div>
              </div>

              <div className='col'>
                <div className='card-style border shadow-lg p-4 rounded'
                style={{
                  backgroundImage: `url('https://www.mrpict.com/uploads/1/8/7/2/18722690/d7d96bb8-cf65-48cc-b93e-e9bbef63a960_1.png')`
                }}
                >
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>          
    </>
  )
}
