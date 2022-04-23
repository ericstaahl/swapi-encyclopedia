import './App.css';
import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation';
import Films from './pages/Films';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<Films />} />
        </Routes>
    </div>
  );
}

export default App;