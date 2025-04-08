import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/booking/:movieId" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;