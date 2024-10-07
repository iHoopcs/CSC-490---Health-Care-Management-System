import React, { useState } from 'react'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar'
import './LearningGame.css'; 
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
export const LearningGame = (props) => {
  const [testKnowledgeModalIsVisible, setTestKnowledgeModalIsVisible] = useState(false); 
  const [vocabModalIsVisible, setVocabModalIsVisible] = useState(false); 
  
  const displayTestKnowledgeModal = () => {
    setTestKnowledgeModalIsVisible(true)
  }
  const handleNoTestKnowledgeModal = () => {
    setTestKnowledgeModalIsVisible(false)
  }

  const displayVocabModal = () => {
    setVocabModalIsVisible(true)
  }

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
                    }}
                  onClick={displayTestKnowledgeModal}
                >
                </div>
                {/*Test Knowledge Info Modal*/}
                <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={testKnowledgeModalIsVisible} >
                  <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                          Welcome to the 'Test your Knowledge' game!
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='p-4'>
                    <h5 className='text-muted text-center mb-5'>
                      'Test your Knoweldge' is an opportunity for you to see if you truly understand what health and nutriton is all about!
                    </h5>
                    <h6 className='text-muted text-center'>
                      'Test you Knowledge' will primarily present a question with multiple choice answers, but only one answer is correct.
                        <pre className='mt-5 fs-4'>
                          Answer the 10 questions and do the best you can!
                        </pre>
                        <pre className='fs-4'>
                        See if you can answers all correct to score a 100%
                        </pre>
                        <pre className='fs-4'>
                          Answer the bonus question for a special suprise! :)
                        </pre>
                    </h6>

                    <h6 className='mt-5 text-center'>Would you like to play?</h6>
                  </Modal.Body>
                  <Modal.Footer>
                      <Row className='w-100 justify-content-around'>
                          <Col>
                              <Button onClick={handleNoTestKnowledgeModal} className='w-100'>No</Button>
                          </Col>

                          <Col>
                              <Button className='w-100'>Yes</Button>
                          </Col>
                      </Row>
                  </Modal.Footer>
              </Modal>
              </div>

              <div className='col'>
                <div className='card-style border shadow-lg p-4 rounded'
                style={{
                  backgroundImage: `url('https://www.mrpict.com/uploads/1/8/7/2/18722690/d7d96bb8-cf65-48cc-b93e-e9bbef63a960_1.png')`
                }}
                onClick={displayVocabModal}
                >
                </div>
                {/*Vocab Game Modal*/}

              </div>
            </div>
          </div>
        </div>
      </div>          
    </>
  )
}
