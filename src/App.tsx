import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/BgAnimation.css";
import "./styles/Tabs.css";
import "./styles/CurrentWeather.css";
import AppRouter from "./components/AppRouter";
import BgAnimation from "./components/BgAnimation";
import CityInputChoose from "./components/CityInputChoose";
import CityNavbar from "./components/CityNavbar";


function App() {
  const [localEmpty, setLocalEmpty] = useState(true);
  const [localFirstElement, setLocalFirstElement] = useState(Object);

  useEffect(() => {
    const storedData = localStorage.getItem('WeatherCity');
    
    if (storedData == null || JSON.parse(storedData).length == 0) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    } else  {
      setLocalFirstElement(JSON.parse(storedData)[0])
      setLocalEmpty(false); 
    } 
  }, []);


  return (
    <div className="App">
      <BgAnimation />
      <AppRouter />

      {localEmpty 
      ? 
        <CityInputChoose />
      : 
        <CityNavbar data={localFirstElement}/>
      }
    </div>
  );
}

export default App;
