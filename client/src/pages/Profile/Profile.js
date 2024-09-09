import React, { useEffect, useState } from 'react'

export const Profile = () => {
  const [user, setUser] = useState({}); 

  const fetchStorageData = () => {
    setUser(JSON.parse(sessionStorage.getItem('userProfileData')))
  }

  useEffect(() => {
    fetchStorageData()
  },[])
  console.log(user)
  return (
    <>
        <div className='container rounded mt-5'>
          <div className='row w-100'>

            {/*Left inner profile box*/}
            <div className='col-sm-auto border p-5 rounded'>
              {/*inner profile box*/}
              <div className='row'>
                {user.firstName} {user.lastName}

              </div>

              <div className='row'>
                {user.email}
              </div>
            </div>
            
            {/*Right box*/}
            <div className='col p-5 border rounded'>
              {/*inner profile box*/}
              <div className='row p-3'>
                <h6 className='text-muted'>Age</h6>
                <h5>{user.age} years old</h5>
              </div>

              <div className='row p-3'>
                <h6 className='text-muted'>Height</h6>
                <h5>{user.height} ft</h5>
              </div>

              <div className='row p-3'>
                <h6 className='text-muted'>Weight</h6>
                <h5>{user.weight} lbs</h5>
              </div>

              
            </div>
          </div>
        </div>
    </>
  )
}
