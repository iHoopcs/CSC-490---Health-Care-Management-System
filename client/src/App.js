import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';

/** 
  * Entry point of the application used to manage the pages of the 
  * application via functionallity of the react-router-dom
*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
