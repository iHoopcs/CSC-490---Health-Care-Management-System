import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import TestPage from './pages/TestPage.js';

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
