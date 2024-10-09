import React, { useState } from 'react'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar'
import './LearningGame.css'; 
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const questionsAndAnswers = [
  {
    question: 'Which of the following is considered part of the dairy food group?',
    choices: ['chicken', 'orange', 'potato', 'cheese'],
    answer: 'cheese'
  },
  {
    question: 'Which vitamin is known to help maintain/support the immune system?',
    choices: ['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin E'],
    answer: 'Vitamin C'
  },
  {
    question: 'What is a clear sign that you are dehydrated or have not drank enough water?',
    choices: ['scratchy eyes', 'urine color is dark yellow', 'you are hungry', 'sleepiness'],
    answer: 'urine color is dark yellow'
  },
  {
    question: '',
    choices: [],
    answer: ''
  },
]

export const LearningGame = (props) => {
  const [quizMenuIsVisible, setQuizMenuIsVisible] = useState(false); 
  const [quizGameIsVisible, setQuizGameIsVisible] = useState(false); 
  const [currentQuizGameQuestionIndex, setCurrentQuizGameIndex] = useState(0); 

  //test knowledge modal controls
  const displayQuizMenu = () => {
    setQuizMenuIsVisible(true) //display test knowledge game INFO modal
  }
  const handleNoTestKnowledgeModal = () => {
    setQuizMenuIsVisible(false)
  }
  const displayTestKnowledgeGame = () => {
    setQuizGameIsVisible(true) //display test knowledge GAME
    setQuizMenuIsVisible(false)
  }

  const nextQuizGameQuestion = () => { 
    setCurrentQuizGameIndex((prevIndex) => prevIndex+1)
  }
  const previousQuizGameQuestion = () => {
    setCurrentQuizGameIndex((prevIndex) => prevIndex-1)
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
                  onClick={displayQuizMenu}
                >
                </div>
                {/*Test Knowledge Info Modal*/}
                <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={quizMenuIsVisible} >
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
                              <Button onClick={displayTestKnowledgeGame} className='w-100'>Let's play!</Button>
                          </Col>
                      </Row>
                  </Modal.Footer>
              </Modal>
              
              {/*Test Knowledge Game*/}
              <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={quizGameIsVisible}>
                  <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                        Question {currentQuizGameQuestionIndex+1}
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='p-4 d-flex flex-column justify-content-center align-items-center'>
                    <Col>
                      <Row className='mb-4'><h5>{questionsAndAnswers[currentQuizGameQuestionIndex].question}</h5></Row>
                        {
                          //display each choice as a clickable button
                          questionsAndAnswers[currentQuizGameQuestionIndex].choices.map((item, index) => {
                            return (
                              <>
                                <Row key={index} className='mb-3'>
                                  <button className='btn btn-outline-secondary'>{item}</button>
                                </Row>
                              </>
                            )
                          })
                        }
                    </Col>
                  </Modal.Body>
                  <Modal.Footer>
                      <Row className='w-100 justify-content-around'>
                        {
                          currentQuizGameQuestionIndex == 0 
                            ? <Col>
                                <Button disabled className='w-100'>Previous</Button>
                              </Col>
                            : <Col>
                                <Button onClick={previousQuizGameQuestion} className='w-100'>Previous</Button>
                              </Col>
                        }
                          <Col>
                              <Button onClick={nextQuizGameQuestion} className='w-100'>Next</Button>
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
                onClick={() => window.alert('TODO')}
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
