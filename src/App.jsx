import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation';
import Films from './pages/Films';
import Film from './pages/Film'
import Characters from './pages/Characters'
import Character from './pages/Character';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<Film />} />
          <Route path="/people/:id" element={<Character />} />
          <Route path="/people" element={<Characters />} />
        </Routes>
    </div>
  );
}

export default App;