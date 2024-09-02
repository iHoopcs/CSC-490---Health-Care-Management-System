import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import TestPage from './pages/TestPage.js';

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
          <Route path="/testpage" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
