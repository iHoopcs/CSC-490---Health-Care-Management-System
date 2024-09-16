import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { TopNavBar } from './components/dashboard-top-navbar/TopNavBar.js';
import { Profile } from './pages/Profile/Profile.js';
import { Calendar } from './pages/Calendar/Calendar.js';
import { Nutrition } from './pages/Nutrition/Nutrition.js';
import { Workouts } from './pages/Workouts/Workouts.js';
import {Muscle} from './pages/Workouts/plan_pages/Muscle';
import {Weight} from './pages/Workouts/plan_pages/Weight';
import {Casual} from './pages/Workouts/plan_pages/Casual';

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
          <Route path='/workouts' element={<Workouts />}/>
          <Route path='/nutrition' element={<Nutrition />}/>
          <Route path='/calendar' element={<Calendar />}/>
          <Route path="/plan_pages/Muscle" element={<Muscle />} />
          <Route path="/plan_pages/Weight" element={<Weight />} />
          <Route path="/plan_pages/Casual" element={<Casual />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
