import React, { useEffect, useState } from 'react';
import { SideBar } from '../../../components/dashboard-sidebar/SideBar';
import axios from 'axios';
import './Achievements.css';

export const Achievements = () => {
  const [hasCompletedBabySteps, setHasCompletedBabySteps] = useState(false);
  const [hasCompletedGettingIt, setHasCompletedGettingIt] = useState(false);
  const [hasCompletedTitan, setHasCompletedTitan] = useState(false);
  const [hasCompletedCrumbs, setHasCompletedCrumbs] = useState(false);
  const [hasCompletedConsistency, setHasCompletedConsistency] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const checkAchievements = async () => {
      try {
        // API calls for workout and meal plan completion data
        const workoutResponse = await axios.get('http://localhost:8080/api/workout/complete', {
          params: { email: userEmail },
        });

        const mealResponse = await axios.get('http://localhost:8080/api/food/complete', {
          params: { email: userEmail },
        });

        // Extract data from API responses
        const { completedWorkouts } = workoutResponse.data;
        const { completedMeals } = mealResponse.data;

        // Set workout achievement status
        setHasCompletedBabySteps(completedWorkouts >= 1); // Achievement: Completed 1 workout
        setHasCompletedGettingIt(completedWorkouts >= 7); // Achievement: Completed 7 workouts
        setHasCompletedTitan(completedWorkouts >= 30);   // Achievement: Completed 30 workouts

        // Set meal-plan achievement status
        setHasCompletedCrumbs(completedMeals >= 1);       // Achievement: Completed 1 meal plan
        setHasCompletedConsistency(completedMeals >= 7);  // Achievement: Completed 7 meal plans
      } catch (error) {
        console.error('Error checking achievements:', error);
      }
    };

    checkAchievements();
  }, []);

  return (
    <div className="achievements-container">
      <div className="row w-100">
        <div className="col-sm-auto">
          <SideBar />
        </div>
        <div className="col">
          <div className="container-fluid p-4">
            <header className="achievements-header">
              <h1>My Achievements</h1>
            </header>

            <div className="achievements-section">
              <p>Workout Achievements:</p>
              <ul>
                <li className={hasCompletedBabySteps ? 'achieved' : ''}>
                  {hasCompletedBabySteps ? '✓ ' : ''}Baby steps
                </li>
                <li className={hasCompletedGettingIt ? 'achieved' : ''}>
                  {hasCompletedGettingIt ? '✓ ' : ''}Getting it
                </li>
                <li className={hasCompletedTitan ? 'achieved' : ''}>
                  {hasCompletedTitan ? '✓ ' : ''}Titan!
                </li>
              </ul>
              <p>Meal-plan Achievements:</p>
              <ul>
                <li className={hasCompletedCrumbs ? 'achieved' : ''}>
                  {hasCompletedCrumbs ? '✓ ' : ''}Crumbs
                </li>
                <li className={hasCompletedConsistency ? 'achieved' : ''}>
                  {hasCompletedConsistency ? '✓ ' : ''}Consistency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
