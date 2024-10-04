import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const Nutrition = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [todaysPlan, setTodaysPlan] = useState('');

  useEffect(() => {
    const fetchTodaysPlan = async () => {
      const plan = await getTodaysMealPlan();
      setTodaysPlan(plan);
    };

    fetchTodaysPlan();
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

  return (
    <Container>
      <Row className="w-100">
        <Col md={6}>
          <h2>Today's Meal Plan</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Protien</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {todaysPlan && todaysPlan.foods && todaysPlan.foods.map((food) => {
                const description = food.food_description;

                const caloriesMatch = description.match(/Calories:\s*(\d+)kcal/);
                const proteinMatch = description.match(/Protein:\s*([\d.]+)g/);
                const carbsMatch = description.match(/Carbs:\s*([\d.]+)g/);
                const fatMatch = description.match(/Fat:\s*([\d.]+)g/);

                const calories = caloriesMatch ? caloriesMatch[1] : '';
                const protein = proteinMatch ? proteinMatch[1] : '';
                const carbs = carbsMatch ? carbsMatch[1] : '';
                const fat = fatMatch ? fatMatch[1] : '';

                return (
                  <tr key={food.id}>
                    <td>{food.food_name}</td>
                    <td>{calories}</td>
                    <td>{protein + "g"}</td>
                    <td>{carbs + "g"}</td>
                    <td>{fat + "g"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => setMealComplete()}>set meal complete</button>
        </Col>
      </Row>
    </Container>
  )
}
