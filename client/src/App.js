import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { TopNavBar } from './components/dashboard-top-navbar/TopNavBar.js';
import { Profile } from './pages/Profile/Profile.js';
import { Calendar } from './pages/Calendar/Calendar.js';
import { Nutrition } from './pages/Nutrition/Nutrition.js';
import { Workouts } from './pages/Workouts/Workouts.js';
import { WorkoutPlan } from './pages/Workouts/plan_pages/WorkoutPlan';
import { WorkoutDay } from './pages/Workouts/plan_pages/WorkoutDay';

/**
  * Entry point of the application used to manage the pages of the
  * application via functionallity of the react-router-dom
*/
function App() {
  return (
    <>
      <TopNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/workouts' element={<Workouts />} />
          <Route path='/workouts/day' element={<WorkoutDay />} />
          <Route path='/nutrition' element={<Nutrition />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path="/plan_pages/WorkoutPlan" element={<WorkoutPlan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
