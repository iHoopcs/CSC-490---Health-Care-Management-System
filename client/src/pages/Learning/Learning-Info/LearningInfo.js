import React from 'react'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar'
import './LearningInfo.css';
import Carousel from 'react-bootstrap/Carousel';

export const LearningInfo = () => {
  return (
    <>
      <div id="LearningInfoContainer" className='container-fluid'>
        <div className='row w-100' style={{ height: '100vh' }}>
          <div className='col-sm-auto'>
            <SideBar />
          </div>

          <div className='col'>
            {/**/}
            <div id='sub-header' >
              <ul>
                <li><a href='#Basics'>Health & Nutrition Basics</a></li>
                <li><a href='#FoodGroups'>Major Food Groups</a></li>
                <li><a href='#BodySystems'>Body Systems</a></li>
                <li><a href='#SuggestAndRecommend'>Suggestions and Recommendations</a></li>
                <li><a href='#Avoid'>Things to Avoid</a></li>
              </ul>
            </div>

            <div className='container-fluid'>
              <div id='Basics' className='mb-5 mt-5 header-content'>
                <h3>Basics</h3>
                <h4>Health is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.</h4>

                <h4>Nutrition is the study of food and how it affects the health and growth of the body.
                  Nutrients are substances found in food that our bodies use to grow, reproduce and survive.
                </h4>

                <h4>
                  Water is essential for many bodily functions since human bodies are made up of around 60% of water. It helps your body keep normal body temperature,
                  lubricates joints, protects your spinal cord, and helps get rid of wastes through sweating, urinating, and bowel movements.
                </h4>
              </div>

              <div id='FoodGroups' className='mb-5 mt-5 header-content'>
                <div className='row'>
                  <div className='col-8'> {/*Left info */}
                    <h3>Major Food Groups</h3>
                    <h4>These are the 5 major food groups that arguably are recommended to comprise a balanced diet, providing the necessary nutrients to your body.</h4>
                    <h4>Fruits</h4>
                    <p>Fruits are rich in vitamins, minerals, and fiber. They are often low in calories and great for the body, aiding to a healthy diet.</p>
                    <p>Ex: Apples, Bananas, Strawberries</p>

                    <h4>Vegetables</h4>
                    <p>Another great source of vitamins and minerals necessary for the body. They offer a great and healthy variety of nutrients.</p>
                    <p>Ex: Spinach, kale, broccoli, carrots</p>

                    <h4>Grains</h4>
                    <p>Grains are essential to offering carbohydrates to the body and fiber. </p>
                    <p>Ex: Breads, brown rice, oats</p>

                    <h4>Proteins</h4>
                    <p>A variety of different proteins are great and are important. Proteins are essential to building muscle and repairing tissue, as well as producing enzymes and hormones.</p>
                    <p>Ex: Meats (Chicken / pork), fish, eggs, beans, nuts</p>

                    <h4>Dairy</h4>
                    <p>Provides calcium which is necessary for bone health and also offer calcium and vitamin D important for the body.</p>
                    <p>Ex: Milk, yogurts, cheese</p>
                  </div>

                  <div className='col-4 my-auto'> {/* Right carousel  */}
                    <Carousel>
                      <Carousel.Item>
                        <img
                          src="https://promova.com/content/large_list_of_fruits_6f8aa72869.png"
                          className="d-block w-100"
                          alt="Fruits" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://promova.com/content/vegetables_list_bed1c24ae1.png"
                          className="d-block w-100"
                          alt="Vegetables" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://i.pinimg.com/474x/7e/de/c5/7edec5bdf04e853f389c20774de05dbc.jpg"
                          className="d-block w-100"
                          alt="Grains" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src='https://c8.alamy.com/comp/2PN7J4X/high-protein-food-ingredients-set-2PN7J4X.jpg'
                          className='d-block w-100'
                          alt='Proteins' />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://thedietplate.com/cdn/shop/articles/What_is_Dairy.png?v=1704224579&width=2048"
                          className="d-block w-100"
                          alt="Dairy" />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>


              </div>

              <div id='BodySystems' className='mb-5 mt-5 header-content'>
                <div className='row'>
                  <div className='col-7'>{/*Left info */}
                    <h3>Systems of the Body</h3>

                    <h4>The Lymphatic System</h4>
                    <p>Functions as the drainage system of the body. It carries excess fluid, proteins, fats, bacteria, and other substances away from cells; returns fluid to blood.</p>

                    <h4>The Respiratory System</h4>
                    <p>Mainly responsible for breathing. It also moves oxygen and carbon dioxide into and out of the bloodstream. Also helps to regulate the body's ph balance.</p>

                    <h4>The Integumentary System</h4>
                    <p>It is the skin system, largest and only single-organ system in the body. Protects the body from external environment and helps regulated body temperature.</p>

                    <h4>The Endocrine System</h4>
                    <p>It is mostly responsible for secreting hormones into the bloodstream and regulating metabolism.</p>

                    <h4>The Digestive System</h4>
                    <p>It is responsible for breaking down foods into nutrients for the body to use as energy growth and cell repair.</p>

                    <h4>The Urinary System</h4>
                    <p>This system functions by removing excess fluid and help regulate blood pressure.</p>

                    <h4>The Muscular System</h4>
                    <p>This system provides the framework and engine for body movement, posture, physical abilities.</p>

                    <h4>The Nervous System</h4>
                    <p>It is a complex network that makes it possible for different parts of the body to communicate to each other. All body processes, reactions, thoughts, and movements stem from this system.</p>

                    <h4>The Cardiovascular System</h4>
                    <p>Transports oxygen and nutrients to all corners of the body. It also carries away carbon dioxide and other waste products.</p>

                    <h4>The Reproductive System</h4>
                    <p>Produces sex hormones and gametes respective to gender. (Testes & penis in male / Ovaries, vagina, and uterus in female)</p>

                    <h4>The Skeletal System</h4>
                    <p>Working together with the muscular system, it supports the body and enables movement. Responsible for housing all of the bones of your internal skeleton. </p>
                  </div>


                  <div className='col-4 my-auto'> {/* Right carousel container */}
                    <Carousel>
                      <Carousel.Item>
                        <img
                          src="https://i0.wp.com/gutcaregh.com/wp-content/uploads/2024/04/Lymphatic-System.jpg?fit=1125%2C1486&ssl=1"
                          className="d-block w-100"
                          alt="Lymphatic System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://my.clevelandclinic.org/-/scassets/images/org/health/articles/respiratory-system"
                          className="d-block w-100"
                          alt="Respiratory System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://microbenotes.com/wp-content/uploads/2020/06/Integumentary-System.jpg"
                          className="d-block w-100"
                          alt="Integumentary System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/Endocrine%20organs%20-%20%20Designua_thumb.jpg"
                          className="d-block w-100"
                          alt="Endocrine System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://www.niddk.nih.gov/-/media/Images/Health-Information/Digestive-Diseases/The_Digestive_System_450x531.jpg"
                          className="d-block w-100"
                          alt="Digestive System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://nurseslabs.com/wp-content/uploads/2017/04/Urinary-System-Urinary-System-Anatomy-and-Physiology.png"
                          className="d-block w-100"
                          alt="Urinary System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://nurseslabs.com/wp-content/uploads/2017/07/Muscular-System-Muscular-System.jpg"
                          className="d-block w-100"
                          alt="Muscular System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://my.clevelandclinic.org/-/scassets/images/org/health/articles/21202-nervous-system"
                          className="d-block w-100"
                          alt="Nervous System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://www.respiratorytherapyzone.com/wp-content/uploads/2022/10/Cardiovascular-System-Labeled-Vector-Illustration.png"
                          className="d-block w-100"
                          alt="Cardiovascular System" />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src='https://www.niehs.nih.gov/sites/default/files/health/assets/images/reproductive_health_og.jpg'
                          className='d-block w-100'
                          alt='Reproductive System' />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          src="https://cdn1.byjus.com/wp-content/uploads/2015/12/The-Skeletal-System2.png"
                          className="d-block w-100"
                          alt="Skeletal System" />
                      </Carousel.Item>
                    </Carousel>
                  </div>

                </div>
                {/*Cite*/}
                {/*https://med.libretexts.org/Bookshelves/Anatomy_and_Physiology/Human_Anatomy_and_Physiology_Preparatory_Course_(Liachovitzky)/05%3A_Higher_Levels_of_Complexity-_Organs_and_Systems/5.01%3A_Organs_and_Systems_of_the_Human_Organism#:~:text=They%20are%20Integumentary%20System%2C%20Skeletal,System%20(Female%20and%20Male).*/}
                {/*https://www.verywellhealth.com/organ-system-1298691*/}
                {/*https://training.seer.cancer.gov/anatomy/skeletal/*/}
                {/*https://www.who.int/about/governance/constitution#:~:text=Health%20is%20a%20state%20of,belief%2C%20economic%20or%20social%20condition.*/}
                {/*https://www.healthline.com/nutrition/27-health-and-nutrition-tips#coffee*/}
              </div>

              <div id='SuggestAndRecommend' className='mb-5 mt-5 header-content'>
                <h3>Suggestions & Recommendations</h3>
                <h4>*Sleep is essential: Ensure to get anywhere from 7 - 10+ hours of proper sleep / rest*</h4>
                <h4>*Eat plenty of fruits and vegetables*</h4>
                <h4>*Drink plenty of water*</h4>
                <h4>*Stay physically active - partake in some kind of physical movement daily*</h4>
              </div>

              <div id='Avoid' className='mb-5 mt-5 header-content'>
                <h3>Things to Avoid</h3>
                <h4>*Drugs, smoking, alcohol consumption - excessive use / any use of such can negatively affect your overall health - responsible for the diagnosis of serious diseases (ex: lung cancer, cardiovascular problems, liver diseases, etc) *</h4>
                <h4>*Unprotected sex: use proper contraception to avoid STIs and STDs*</h4>
                <h4>*Minimize sugar intake and process food consumption*</h4>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
