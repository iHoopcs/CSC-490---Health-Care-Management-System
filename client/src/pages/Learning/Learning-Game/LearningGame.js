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
    question: 'What is nutrition?',
    choices: ['how food works in the body', 'the study of the human body', 'the study of nature and our surroundings', 'the study of food and how it affects the health and growth of the body'],
    answer: 'the study of food and how it affects the health and growth of the body'
  },
  {
    question: 'Which of the following is NOT a major system of the body?', 
    choices: ['Digestive', 'Respiratory', 'Salivatory', 'Integumentary'],
    answer: 'Salivatory'
  },
  {
    question: 'Which of the following systems of the body is responsible for breaking down and digesting food?',
    choices:['Muscular', 'Reproductive', 'Lymphatic', 'Digestive'],
    answer: 'Digestive'
  },
  {
    question: 'Approximately, how much water per day should men intake?',
    choices:['16 cups of water', '100 cups of water', '24 cups of water', '500 cups of water'],
    answer: '16 cups of water'
  },
  {
    question: 'Which of the following foods / drinks are known to not be the best option when working to achieve optimal nutritional health?',
    choices:['Alcohol', 'Energy Drinks', 'Processed foods', 'All of the above'],
    answer: 'All of the above'
  },
  {
    question: 'Which vitamin is primarily obtained from sunlight?',
    choices: ['Vitamin D', 'Vitamin C', 'Vitamin A', 'Vitamin E'],
    answer: 'Vitamin D'
  },
  {
    question: 'Which nutrient is essential for muscle repair and growth?',
    choices: ['Carbohydrates', 'Fats', 'Proteins', 'Vitamins'],
    answer: 'Proteins'
  },
  {
    question: 'Who is the reason the world is a better place?',
    choices: ['YOU!', 'nope not this one', 'not this one eithere', 'try the first answer'],
    answer: 'YOU!'
  }
]

export const LearningGame = (props) => {
  const [quizMenuIsVisible, setQuizMenuIsVisible] = useState(false); //explains game
  const [quizGameIsVisible, setQuizGameIsVisible] = useState(false); //actual game
  const [quizResultsVisible, setQuizResultsVisible] = useState(false); //game results
  const [currentQuizGameQuestionIndex, setCurrentQuizGameIndex] = useState(0); 
  const [userAnswers, setUserAnswers] = useState(new Map()); 
  const [quizScore, setQuizScore] = useState(null); 

  const storeUserInputAnswer = (key, value) => {
    setUserAnswers(prev => new Map(prev).set(key, value)) //store user selected answers - key value pair for verification
  }
  
  const submitQuiz = () => {
    let totalScore = 0; 

    //calculate score
    for (let i = 0; i < questionsAndAnswers.length; i++){
      //compare user answer to correct answer - +1 if correct
      if (userAnswers.get(i) == questionsAndAnswers[i].answer){
        totalScore+=1;
      }
    }
    setQuizScore(totalScore)

    //reset quiz
    setCurrentQuizGameIndex(0)
    userAnswers.clear(); 
    
    setQuizGameIsVisible(false)
    setQuizResultsVisible(true)
  }
  console.log(userAnswers)
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
                  onClick={() => setQuizMenuIsVisible(true)}
                >
                </div>
                {/*Game Menu*/}
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
                              <Button onClick={() => setQuizMenuIsVisible(false)} className='w-100'>No</Button>
                          </Col>

                          <Col>
                              <Button onClick={() => {
                                setQuizMenuIsVisible(false) 
                                setQuizGameIsVisible(true)}} 
                                className='w-100'
                              >
                                Let's play!
                              </Button>
                          </Col>
                      </Row>
                  </Modal.Footer>
              </Modal>
              
              {/*Game*/}
              <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={quizGameIsVisible}>
                  <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                        {
                          currentQuizGameQuestionIndex == 10
                            ? <span>*BONUS QUESTION*</span>
                            : <span>Question {currentQuizGameQuestionIndex+1}</span>
                        }
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='p-4'>
                        <Row className='mb-4 w-100 text-center'><h5>{questionsAndAnswers[currentQuizGameQuestionIndex].question}</h5></Row>
                          {
                            //display each choice as a clickable button
                            questionsAndAnswers[currentQuizGameQuestionIndex].choices.map((item, index) => {
                              return (
                                <>
                                  <Row key={index} className='mb-3 p-2 w-100'>
                                    <div className='text-center'>
                                      <button className='btn btn-outline-secondary quiz-btn p-3 w-100'
                                        value={item}
                                        onClick={(e) => storeUserInputAnswer(currentQuizGameQuestionIndex, e.currentTarget.value)}
                                      >
                                        <span className='fs-5'>{item}</span>
                                      </button>
                                    </div>
                                  </Row>
                                </>
                              )
                            })
                          }
                  </Modal.Body>
                  <Modal.Footer>
                      <Row className='w-100 justify-content-around'>
                        {
                          currentQuizGameQuestionIndex == 0 
                            ? <Col>
                                <Button disabled className='w-100'>Previous</Button>
                              </Col>
                            : <Col>
                                <Button onClick={() => setCurrentQuizGameIndex((prevIndex) => prevIndex-1)} className='w-100'>Previous</Button>
                              </Col>
                        }
                        {
                          currentQuizGameQuestionIndex == 10
                            ? <Col>
                                  <Button onClick={submitQuiz} className='w-100'>Submit</Button>
                              </Col>
                            : 
                              <Col>
                                <Button onClick={() => setCurrentQuizGameIndex((prevIndex) => prevIndex+1)} className='w-100'>Next</Button>
                              </Col>
                        }
                      </Row>
                  </Modal.Footer>
              </Modal>

              {/*Game Results*/}
              <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={quizResultsVisible} >
                  <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter" className='w-100 text-center'>
                        <span>*Quiz Results*</span>
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='p-4 text-center'>
                    {
                      quizScore >= 7 
                      ? 
                      <>
                        <h5 className='mb-4'>{Math.round((quizScore / 11) * 100)}% </h5>
                        <span className='fs-4'>You scored a {quizScore} / 11!</span>
                        <span className='fs-4 d-block'>Awesome, you passed!</span>
                        <span className='fs-4 d-block'>Well Done!</span>
                        <span className='fs-4 d-block'>You have shown that you truly understand the basics of nutrition and health.</span>
                      </>
                      : 
                      <>
                        <h5 className='mb-4'>{(quizScore / 11) * 100}% </h5>
                        <span className='fs-4'>You scored a {quizScore} / 11!</span>
                        <span className='fs-4 d-block'>Unfortunately, you did not pass the quiz.</span>
                        <span className='fs-4 d-block'>Although you did not pass this time, you can always try again!</span>
                        <span className='fs-4 d-block'>Remember that you can refer to the /learning page for review</span>
                      </>
                    }
                  </Modal.Body>
                  <Modal.Footer>
                      <Row className='w-100 justify-content-around'>
                        <Button onClick={() => setQuizResultsVisible(false)} className='w-100'>Close</Button>
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

              </div>1
            </div>
          </div>
        </div>
      </div>          
    </>
  )
}
