import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation';
import Films from './pages/Films';
import Film from './pages/Film'
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<Film />} />
        </Routes>
    </div>
  );
}

export default App;