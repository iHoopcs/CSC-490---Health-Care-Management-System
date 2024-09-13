import React, { useEffect } from 'react'
import { SideBar } from '../../components/dashboard-sidebar/SideBar.js'; 
import axios from 'axios';
import { useState } from 'react';
import { SocialPost } from '../../components/social-post-card/SocialPost.js';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const Social = (props) => {
    const [posts, setPosts] = useState([]);
    const [postModalVisibility, setPostModalVisibility] = useState(false); 
    const [postMessage, setPostMessage] = useState(''); 
    const [userFirstName, setUserFirstName] = useState(''); 
    const [userLastName, setUserLastName] = useState(''); 
    const [userAccountName, setUserAccountName] = useState(''); 
    
    //fetch user data from storage
    const fetchUserData = () => {
        const user = JSON.parse(sessionStorage.getItem('userProfileData'))
        setUserFirstName(user.firstName)
        setUserLastName(user.lastName)
    }
    const handleCancelPostModal = () => {
        setPostModalVisibility(false); 
    }

    const handleCreatePostModal = async () => {
        const newPost = {
            firstName: userFirstName, 
            lastName: userLastName, 
            accountName: 'iHoopcs', 
            message: postMessage
        }

        console.log(newPost)


        try {
            await axios.post('http://localhost:8080/api/create-post', newPost)
                .then((response) => {
                    console.log(response)
                }).catch(err => console.log(err))
        }catch (err) {
            console.log(err)
        }


        //clear newPost data & close modal
        setPostMessage(''); 
        setPostModalVisibility(false); 
        window.location.reload();
    }

    const fetchPosts = async () => {
        try {
            await axios.get('http://localhost:8080/api/posts')
                .then((response) => {
                    console.log(response)
                    setPosts(response.data.posts)
                })
                .catch(err => console.log(err))
        }catch(err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        fetchPosts()
        fetchUserData()
    },[])

    return (
        <>
            <div className='container-fluid'>
                <div className='row w-100'>
                    <div className='col-sm-auto'>
                        <SideBar />
                    </div>

                    <div className='col'>
                        <div className='container'>
                            <h5 className='text-center mt-5 mb-5'>See what others are talking about!</h5>
                            
                            <div className='d-flex justify-content-center mb-4'>
                                <button className='btn btn-primary' onClick={() => {setPostModalVisibility(true)}}>New Post?</button>
                            </div>
                            {/*New Post Modal Popup*/}
                            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={postModalVisibility}>
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                                        <span className='fs-4'>Share with others in the NutriFit Social Community</span>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='mb-4 p-3'>
                                <form>
                                    <div class="form-group">
                                        <label for="firstName">First Name</label>
                                        <input type="email" class="form-control" id="firstName" placeholder="Caleb" disabled />
                                    </div>
                                    <div class="form-group mt-3">
                                        <label for="lastName">Last Name</label>
                                        <input type="password" class="form-control" id="lastName" placeholder='Simmons' disabled />
                                    </div>
                                    <div class="form-group mt-3">
                                        <label for="accountName">Account Name</label>
                                        <input type="password" class="form-control" id="accountName" placeholder='iHoopcs' disabled />
                                    </div>
                                    <div class="form-group mt-3">
                                        <label for="postMessage">Message</label>
                                        <textarea class="form-control" id="postMessage" rows="3" value={postMessage} onChange={(e) => {setPostMessage(e.target.value)}}></textarea>
                                        <small id="postMessage" class="form-text text-muted">Share & connect with others!</small>
                                    </div>
                                </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Row className='w-100 justify-content-around'>
                                        <Col>
                                            <Button onClick={handleCancelPostModal} className='w-100'>Cancel</Button>
                                        </Col>

                                        <Col>
                                            <Button onClick={handleCreatePostModal} className='w-100'>Post</Button>
                                        </Col>
                                    </Row>
                                </Modal.Footer>
                            </Modal>
                            {
                                posts.map((post) => {
                                    return (
                                        <>
                                            <SocialPost post={post}/>
                                        </>
                                    )
                                    
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
