import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const Nutrition = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [nutritionDayPlans, setNutritionDayPlans] = useState([]);

  useEffect(() => {
    const storedPlans = localStorage.getItem('nutritionDayPlans');
    if (storedPlans) {
      setNutritionDayPlans(JSON.parse(storedPlans));
    } else {
      generateWeekPlan().then(plan => {
        setNutritionDayPlans(plan);
        localStorage.setItem('nutritionDayPlans', JSON.stringify(plan));
      });
    }

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

  const generateWeekPlan = async () => {
    const response = await axios.post('http://localhost:8080/api/food/genPlan',
      { userEmail: userEmail });

    return response.data;
  }


  return (
    <Container>
      <Row className="w-100">
        <Col md={6}>
          {nutritionDayPlans.map((item, index) => (
            <div key={index}>
              <h2>{item.day}</h2>
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
                  {item.foods.map((food) => {
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
                      <tr>
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
            </div>
          ))}
          <button onClick={() => getFoodItem()}>Click me</button>
        </Col>
      </Row>
    </Container>
  )
}
