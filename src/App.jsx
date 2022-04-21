import { useEffect, useState } from 'react';
import './App.css';
import swapi from "./services/swapi"

function App() {
  const [info, setInfo] = useState("")
  const fetchInfo = async () => {
    const data = await swapi.getInfo()
    console.log(data)
    setInfo(data.data.results)
  }
  
  return (
    <div className="App">
      <button onClick={() => fetchInfo()}>Get Info</button>
      <p>{info && (info[0].name)}</p>
    </div>
  );
}

export default App;
