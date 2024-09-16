import React, { useState } from 'react'
import './SocialPost.css'; 
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegThumbsDown } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'; 


export const SocialPost = (props) => {
    const { post } = props; 

    const [heartIsClicked, setHeartIsClicked] = useState(false); 
    const [thumbsDownIsClicked, setThumbsDownIsClicked] = useState(false); 
    const [reportIsClicked, setReportIsClicked] = useState(false); 
    const [replyModalVisible, setReplyModalVisible] = useState(false); 
    const [replyMessage, setReplyMessage] = useState(''); 

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

    const handleCancelPostModal = () => {
        setReplyModalVisible(false); 
    }

    const handleReplyModal = async () => {
        const user = JSON.parse(sessionStorage.getItem('userProfileData'))
        const replyPost = {
            firstName: user.firstName, 
            lastName: user.lastName, 
            accountName: user.accountName, 
            message: '@' + post.accountName + ' ' + replyMessage
        }
        console.log(replyPost)

        
        try {
            await axios.post('http://localhost:8080/api/create-post', replyPost)
                .then((response) => {
                    console.log(response)
                })
                .catch(err => console.log(err))
        }catch (err) {
            console.log(err)
        }
        
        //clear reply message - close modal and refresh page
        setReplyMessage(''); 
        setReplyModalVisible(false); 
        window.location.reload();
        

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
                                    : 
                                    <>
                                        <button onClick={handleHeart} data-tooltip-id='like-comment' data-tooltip-content='Like?' data-tooltip-place='top-end'><IoIosHeartEmpty /></button>
                                        <Tooltip id='like-comment'/>
                                    </>
                            }
                            {
                                thumbsDownIsClicked === true
                                    ? <button className='mx-4'><AiFillDislike /></button>
                                    : 
                                    <>
                                        <button className='mx-4' onClick={handleDislike} data-tooltip-id='dislike-comment' data-tooltip-content='Dislike?' data-tooltip-place='top'><FaRegThumbsDown /></button>
                                        <Tooltip id='dislike-comment'/>
                                    </>
                                    
                             
                            }
                            <button onClick={() => {setReplyModalVisible(true)}} data-tooltip-id='reply' data-tooltip-content='Reply...' data-tooltip-place='top'><FaMessage /></button>
                            <Tooltip id='reply'/>

                            {/*Post Reply Modal*/}
                            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={replyModalVisible}>
                                <Modal.Body className='mb-2 p-3'>
                                <form>
                                    <div class="form-group mt-3">
                                        <label for="replyMessage">Reply to @{post.accountName}</label>
                                        <textarea className="form-control mt-3" id="replyMessage" rows="3" value={replyMessage} onChange={(e) => {setReplyMessage(e.target.value)}} placeholder={`@${post.accountName}`}></textarea>
                                    </div>
                                </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Row className='w-100 justify-content-around'>
                                        <Col>
                                            <Button onClick={handleCancelPostModal} className='w-100'>Cancel</Button>
                                        </Col>

                                        <Col>
                                            <Button onClick={handleReplyModal} className='w-100'>Post</Button>
                                        </Col>
                                    </Row>
                                </Modal.Footer>
                            </Modal>
                            
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
