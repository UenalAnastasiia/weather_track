import { useEffect } from "react";
import "./styles/App.css";
import "./styles/BgAnimation.css";
import "./styles/Tabs.css";
import "./styles/CurrentWeather.css";
import Navbar from "./components/Navbar";
import TodayWeather from "./components/today_components/TodayWeather";
import AppRouter from "./components/AppRouter";
import BgAnimation from "./components/BgAnimation";
import WeatherService from "./API/weatherService";

function App() {
  // useEffect(() => {
  //   WeatherService.getCoordinatesForUrl(51.2217, 6.7762);
  // }, []);


  return (
    <div className="App">
      <BgAnimation />
      {/* <Navbar /> */}
      <AppRouter />
      {/* <TodayWeather /> */}
    </div>
  );
}

export default App;
