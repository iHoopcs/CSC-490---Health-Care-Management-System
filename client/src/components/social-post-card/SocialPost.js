import React, { useState } from 'react'
import './SocialPost.css'; 
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegThumbsDown } from "react-icons/fa";

export const SocialPost = (props) => {
    const { post } = props; 

    const [heartIsClicked, setHeartIsClicked] = useState(false); 
    const [thumbsDownIsClicked, setThumbsDownIsClicked] = useState(false); 
    const [reportIsClicked, setReportIsClicked] = useState(false); 

    const handleHeart = () => {
        setHeartIsClicked(true)
        setThumbsDownIsClicked(false)
    }

    const handleDislike = () => {
        setThumbsDownIsClicked(true)
        setHeartIsClicked(false) 
    }

    const handleReport = () => {
        setReportIsClicked(!reportIsClicked)
    }


    return (
        <>  
            <div className='card mb-5 rounded border shadow-sm'>
                <div className='card-header p-3'>
                    <h4 className='text-muted'>{post.firstName} {post.lastName} @{post.accountName}</h4     >
                </div>
                <div className='card-body'>
                    <span className='fs-5'>{post.message}</span>
                </div>
                <div className='card-footer p-3'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            {
                                heartIsClicked === true 
                                    ? <button><FaHeart /></button>
                                    : <button onClick={handleHeart}><IoIosHeartEmpty /></button>
                            }
                            {
                                thumbsDownIsClicked === true
                                    ? <button className='mx-4'><AiFillDislike /></button>
                                    : <button className='mx-4' onClick={handleDislike}><FaRegThumbsDown /></button>
                             
                            }
                            <button><FaMessage /></button>
                            
                        </div>

                        <div>
                        <button onClick={handleReport}><BsThreeDots /></button>
                            {
                                reportIsClicked === true
                                    ? <button className='btn btn-outline-danger report'>Report</button>
                                    : ''
                            }
                        </div>
                        
                    </div>
                    <div>
                        
                    </div>

                </div>
            </div>
        </>
    )
}
