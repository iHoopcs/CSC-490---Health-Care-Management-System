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

  const [workoutMedals, setWorkoutMedals] = useState({});
  const [mealPlanMedals, setMealPlanMedals] = useState({});

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const checkAchievements = async () => {
      try {
        const workoutResponse = await axios.get('http://localhost:8080/api/workout/complete', {
          params: { email: userEmail },
        });

        const mealResponse = await axios.get('http://localhost:8080/api/food/complete', {
          params: { email: userEmail },
        });

        // Access completeCount directly
        const completedWorkouts = workoutResponse.data.completeCount;
        const completedMeals = mealResponse.data.completeCount;

        // Set workout achievement status
        setHasCompletedBabySteps(completedWorkouts >= 1);  // Achievement: Completed 1 workout
        setHasCompletedGettingIt(completedWorkouts >= 7);  // Achievement: Completed 7 workouts
        setHasCompletedTitan(completedWorkouts >= 30);     // Achievement: Completed 30 workouts

        // Set meal-plan achievement status
        setHasCompletedCrumbs(completedMeals >= 1);        // Achievement: Completed 1 meal plan
        setHasCompletedConsistency(completedMeals >= 7);   // Achievement: Completed 7 meal plans

        // Set medals based on completed workouts
        setWorkoutMedals({
          babySteps: completedWorkouts >= 1 ? ('bronze') : null,
          gettingIt: completedWorkouts >= 7 ? ('silver') : null,
          titan: completedWorkouts >= 30 ? 'gold' : null,
        });

        // Set medals based on completed meals
        setMealPlanMedals({
          crumbs: completedMeals >= 1 ? ('bronze') : null,
          consistency: completedMeals >= 7 ? ('silver'): null,
        });

      } catch (error) {
        console.error('Error checking achievements:', error);
      }
    };

    checkAchievements();
  }, []);

  // Helper function to render the medal
  const renderMedal = (medalType) => {
    if (medalType === 'gold') return <span className="medal gold">🥇</span>;
    if (medalType === 'silver') return <span className="medal silver">🥈</span>;
    if (medalType === 'bronze') return <span className="medal bronze">🥉</span>;
    return null;
  };

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
                  {renderMedal(workoutMedals.babySteps)} Baby steps
                </li>
                <li className={hasCompletedGettingIt ? 'achieved' : ''}>
                  {renderMedal(workoutMedals.gettingIt)} Getting it
                </li>
                <li className={hasCompletedTitan ? 'achieved' : ''}>
                  {renderMedal(workoutMedals.titan)} Titan!
                </li>
              </ul>
              <p>Meal-plan Achievements:</p>
              <ul>
                <li className={hasCompletedCrumbs ? 'achieved' : ''}>
                  {renderMedal(mealPlanMedals.crumbs)} Crumbs
                </li>
                <li className={hasCompletedConsistency ? 'achieved' : ''}>
                  {renderMedal(mealPlanMedals.consistency)} Consistency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};