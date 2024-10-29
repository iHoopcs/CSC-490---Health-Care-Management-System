import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { SideBar } from '../../components/dashboard-sidebar/SideBar';
import { getNextDay, getPreviousDay, getDayOfWeek } from '../../utility/dateUtils';
import axios from 'axios';

export const Nutrition = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [todaysPlan, setTodaysPlan] = useState('');
  const [userNutritionPlan, setUserNutritionPlan] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentFoodName, setCurrentFoodName] = useState('click a food item');
  const [foodPicture, setFoodPicture] = useState('');
  const [foodLink, setFoodLink] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState(getDayOfWeek(date));
  const hasFetched = useRef(false);

  const weightLossInfo = `You're current plan is the weight loss plan. This
    plan creates a meal plan consisting foods such as fruit, lean meats, and
    leafy greens. The calorie range is between 1100-1500 calories per day.`

  const casualInfo = `You're current plan is the casual plan. This plan consists
    of a variety of foods. The calorie range is between 1600-2100 calories per day.`;

  const muscleBuildingInfo = `You're current plan is the muscle building plan. This
    plan consists of high protien foods including lean meats, nuts, eggs, and
    protien shakes. The calorie range is between 2150-2800 calories per day.`;

  const planInfo = userNutritionPlan === 'weight-loss' ? weightLossInfo :
    userNutritionPlan === 'casual' ? casualInfo :
      muscleBuildingInfo;

  const mealNames = ["Breakfast", "Lunch", "Dinner"];

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchDaysPlan = async () => {
      const plan = await getDaysPlan(date);
      setTodaysPlan(plan);
      const userPlan = await getUserNutritionPlan();
      setUserNutritionPlan(userPlan);
      setIsLoading(false);
    };

    fetchDaysPlan();
    hasFetched.current = true;
  }, []);

  const getFoodItem = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/food/search',
        { searchTerms: "apple" });

      let food = response.data.foods.food;
      console.log(`Name: ${food.food_name}`);

      return null;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  const setPreviousMeal = async () => {
    setIsLoading(true);

    try {
      const nextDate = getPreviousDay(date);
      setDate(nextDate);
      setDay(getDayOfWeek(nextDate));

      const plan = await getDaysPlan(nextDate);
      setTodaysPlan(plan);
    } catch (error) {
      console.error('Error fetching the plan:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const setNextMeal = async () => {
    setIsLoading(true);

    try {
      const nextDate = getNextDay(date);
      setDate(nextDate);
      setDay(getDayOfWeek(nextDate));

      const plan = await getDaysPlan(nextDate);
      setTodaysPlan(plan);
    } catch (error) {
      console.error('Error fetching the plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  async function setFoodImage(name) {
    try {
      const response = await axios.post('http://localhost:8080/api/image/find',
        { name: name });

      setFoodPicture(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const getDaysPlan = async (date) => {
    await axios.post('http://localhost:8080/api/food/updatePlan',
      { userEmail: userEmail });

    const response = await axios.post('http://localhost:8080/api/food/findMeal',
      { userEmail: userEmail, date: date });

    return response.data;
  }

  const setMealComplete = async () => {
    const currentDate = new Date().toISOString().split('T')[0];

    await axios.post('http://localhost:8080/api/food/setMealComplete',
      { userEmail: userEmail, date: currentDate });
  }

  const getUserNutritionPlan = async () => {
    const response = await axios.get('http://localhost:8080/api/workout/userPreferences',
      { params: { userEmail: userEmail } });

    return response.data.workoutPlan;

  }

  return (
    <div className='container-fluid'>
      <Row className="w-100">
        <Col md={2}>
          <SideBar />
        </Col>
        {
          isLoading ? (
            <>
              <Col md={6}>
                <div className="spinner-border" role="status"></div>
                <span>Loading {day} 's Meal Plan</span>
                <div className="spinner-border" role="status"></div>
              </Col>
            </>
          ) : (
            <>
              <Col md={6}>
                <Row>
                  <h2>
                    Welcome to {day}'s {userNutritionPlan &&
                      <span class="badge rounded-circle text-dark" style={{ backgroundColor: 'yellow', padding: '10px' }}>
                        {" " + userNutritionPlan.toString() + " "}
                      </span>
                    } Meal Plan
                  </h2>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Button variant="primary" onClick={() => setPreviousMeal()}>
                      &lt;
                    </Button>
                  </Col>
                  <Col>
                    <h3>{day + ' ' + date}</h3>
                  </Col>
                  <Col>
                    <Button variant="primary" onClick={() => setNextMeal()}>
                      &gt;
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Meal</th>
                        <th>Food</th>
                        <th>Total Calories</th>
                        <th>Servings</th>
                        <th>Protien dv%</th>
                        <th>Carbs dv%</th>
                        <th>Fat dv%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todaysPlan && todaysPlan.foods && todaysPlan.foods.map((food, index) => {
                        const mealName = index < 3 ? mealNames[index] : "Snack";
                        return (
                          <tr
                            key={food.id}
                            onClick={() => {
                              setCurrentFoodName(food.name);
                              setFoodImage(food.name);
                              if (food.link != null) {
                                setFoodLink(food.link);
                              }
                            }}
                          >
                            <td>{mealName}</td>
                            <td className="col-5">{food.name}</td>
                            <td>{food.calories * food.servings}</td>
                            <td>{food.servings}</td>
                            <td>{food.proteinDv + "%"}</td>
                            <td>{food.carbsDv + "%"}</td>
                            <td>{food.fatDv + "%"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <h6 className="text-center mt-5 ml-3">How We Generate Your Plans</h6>
                  <div class="border border-3 border-warning rounded p-3">
                    <h6 className="mb-3">{planInfo}</h6>
                    <h6 className="mb-3">
                      FatSecret provides a large database of foods and thier nutritional
                      information. This allows us to use key terms to generate a unique
                      and personal nutrition plan for you.
                    </h6>
                    <h6>Learn more about FatSecret</h6>
                    <h6>
                      <a href="https://platform.fatsecret.com/about" target="_blank" rel="noopener noreferrer">https://platform.fatsecret.com/about</a>
                    </h6>
                  </div>
                </Row>
              </Col>
              <Col md={4}>
                <div className="pb-2 mb-3 border-bottom">
                  <h1 className="text-center">{currentFoodName}</h1>
                </div>
                {foodPicture && (
                  <div className="text-center">
                    <img src={foodPicture.src.medium} alt={currentFoodName} className="img-fluid" />
                    <h6 className="text-center">©Images provided by Pexels</h6>
                    <h6 className="text-center">Actual meal may differ from image</h6>
                    <a className="text-center">{foodLink}</a>
                  </div>
                )}
              </Col>
            </>
          )
        }
      </Row>
    </div>
  )
}
