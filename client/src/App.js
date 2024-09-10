import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { TopNavBar } from './components/dashboard-top-navbar/TopNavBar.js';
import { Profile } from './pages/Profile/Profile.js';
import { Calendar } from './pages/Calendar/calendar.js';
import { Nutrition } from './pages/Nutrition/nutrition.js';
import { Workouts } from './pages/Workouts/workouts.js';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
