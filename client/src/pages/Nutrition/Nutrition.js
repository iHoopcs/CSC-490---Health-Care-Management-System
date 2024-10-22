import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { SideBar } from '../../components/dashboard-sidebar/SideBar';
import axios from 'axios';

export const Nutrition = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [todaysPlan, setTodaysPlan] = useState('');
  const [userNutritionPlan, setUserNutritionPlan] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

    const fetchTodaysPlan = async () => {
      console.log('fetching plan');
      const plan = await getTodaysMealPlan();
      setTodaysPlan(plan);
      const userPlan = await getUserNutritionPlan();
      setUserNutritionPlan(userPlan);
      setIsLoading(false);
    };

    fetchTodaysPlan();
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

  const getTodaysMealPlan = async () => {
    const currentDate = new Date().toISOString().split('T')[0];

    await axios.post('http://localhost:8080/api/food/updatePlan',
      { userEmail: userEmail });

    const response = await axios.post('http://localhost:8080/api/food/findMeal',
      { userEmail: userEmail, date: currentDate });

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

    console.log(response.data.workoutPlan);
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
              <div className="spinner-border" role="status"></div>
              <span>Loading Today's Meal Plan</span>
              <div className="spinner-border" role="status"></div>
            </>
          ) : (
            <Col md={6}>
              <h2>
                Welcome to Today's {userNutritionPlan &&
                  <span class="badge rounded-circle text-dark" style={{ backgroundColor: 'yellow', padding: '10px' }}>
                    {" " + userNutritionPlan.toString() + " "}
                  </span>
                } Meal Plan
              </h2>
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
                      <tr key={food.id}>
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
            </Col>
          )
        }
      </Row>
    </div>
  )
}
