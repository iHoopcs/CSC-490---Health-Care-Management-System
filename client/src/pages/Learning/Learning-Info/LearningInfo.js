import React from 'react'
import { SideBar } from '../../../components/dashboard-sidebar/SideBar'
import './LearningInfo.css'; 

export const LearningInfo = () => {
  return (
    <>
      <div className='container-fluid'>
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
                <h4>Basics</h4>
              </div>

              <div id='FoodGroups' className='mb-5 mt-5 header-content'>
                <h4>Major Food Groups</h4>
                <h5>These are the 5 major food groups that arguably are recommended to comprise a balanced diet, providing the necessary nutrients to your body.</h5>
                <h5>Fruits</h5>
                <p>Fruits are rich in vitamins, minerals, and fiber. They are often low in calories and great for the body, aiding to a healthy diet.</p>
                <p>Ex: Apples, Bananas, Strawberries</p>

                <h5>Vegetables</h5>
                <p>Another great source of vitamins and minerals necessary for the body. They offer a great and healthy variety of nutrients.</p>
                <p>Ex: Spinach, kale, broccoli, carrots</p>

                <h5>Grains</h5>
                <p>Grains are essential to offering carbohydrates to the body and fiber. </p>
                <p>Ex: Breads, brown rice, oats</p>

                <h5>Proteins</h5>
                <p>A variety of different proteins are great and are important. Proteins are essential to building muscle and repairing tissue, as well as producing enzymes and hormones.</p>
                <p>Ex: Meats (Chicken / pork), fish, eggs, beans, nuts</p>

                <h5>Dairy</h5>
                <p>Provides calcium which is necessary for bone health and also offer calcium and vitamin D important for the body.</p>
                <p>Ex: Milk, yogurts, cheese</p>
              </div>

              <div id='BodySystems' className='mb-5 mt-5 header-content'>
                <h4>Systems of the Body</h4>

                <h5>The Lymphatic System</h5>
                <p>Functions as the drainage system of the body. It carries excess fluid, proteins, fats, bacteria, and other substances away from cells; returns fluid to blood.</p>

                <h5>The Respiratory System</h5>
                <p>Mainly responsible for breathing. It also moves oxygen and carbon dioxide into and out of the bloodstream. Also helps to regulate the body's ph balance.</p>

                <h5>The Integumentary System</h5>
                <p>It is the skin system, largest and only single-organ system in the body. Protects the body from external environment and helps regulated body temperature.</p>

                <h5>The Endocrine System</h5>
                <p>It is mostly responsible for secreting hormones into the bloodstream and regulating metabolism.</p>

                <h5>The Digestive System</h5>
                <p>It is responsible for breaking down foods into nutrients for the body to use as energy growth and cell repair.</p>

                <h5>The Urinary System</h5>
                <p>This system functions by removing excess fluid and help regulate blood pressure.</p>

                <h5>The Muscular System</h5>
                <p>This system provides the framework and engine for body movement, posture, physical abilities.</p>

                <h5>The Nervous System</h5>
                <p>It is a complex network that makes it possible for different parts of the body to communicate to each other. All body processes, reactions, thoughts, and movements stem from this system.</p>

                <h5>The Cardiovascular System</h5>
                <p>Transports oxygen and nutrients to all corners of the body. It also carries away carbon dioxide and other waste products.</p>

                <h5>The Reproductive System</h5>
                <p>Produces sex hormones and gametes respective to gender. (Testes & penis in male / Ovaries, vagina, and uterus in female)</p>

                <h5>The Skeletal System</h5>
                <p>Working together with the muscular system, it supports the body and enables movement. Responsible for housing all of the bones of your internal skeleton. </p>

                {/*Cite*/}
                {/*https://med.libretexts.org/Bookshelves/Anatomy_and_Physiology/Human_Anatomy_and_Physiology_Preparatory_Course_(Liachovitzky)/05%3A_Higher_Levels_of_Complexity-_Organs_and_Systems/5.01%3A_Organs_and_Systems_of_the_Human_Organism#:~:text=They%20are%20Integumentary%20System%2C%20Skeletal,System%20(Female%20and%20Male).*/}
                {/*https://www.verywellhealth.com/organ-system-1298691*/}
                {/*https://training.seer.cancer.gov/anatomy/skeletal/*/}
              </div>

              <div id='SuggestAndRecommend' className='mb-5 mt-5 header-content'>
                <h4>Suggestions & Recommendations</h4>
              </div>

              <div id='Avoid' className='mb-5 mt-5 header-content'>
                <h4>Things to Avoid</h4>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
