import "./styles/App.css";
import "./styles/BgAnimation.css";
import Navbar from "./components/Navbar";
import TodayWeather from "./components/today_components/TodayWeather";
import AppRouter from "./components/AppRouter";
import BgAnimation from "./components/BgAnimation";

function App() {
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
