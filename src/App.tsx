import { useEffect } from "react";
import "./styles/App.css";
import "./styles/BgAnimation.css";
import "./styles/Tabs.css";
import "./styles/CurrentWeather.css";
import AppRouter from "./components/AppRouter";
import BgAnimation from "./components/BgAnimation";

function App() {
  useEffect(() => {
    const storedData = localStorage.getItem('WeatherCity');

    if (!storedData) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    }
  }, []);


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
