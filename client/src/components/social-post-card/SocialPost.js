import React from 'react'
import './SocialPost.css'; 
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";

export const SocialPost = (props) => {
    const { post } = props; 

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
                            <button><FaHeart /></button>
                            <button className='mx-4'><AiFillDislike /></button>
                            <button><FaMessage /></button>
                        </div>
                        
                        <button><BsThreeDots /></button>
                    </div>
                    <div>
                        
                    </div>

                </div>
            </div>
        </>
    )
}
