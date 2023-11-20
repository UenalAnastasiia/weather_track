import "./styles/App.css";
import "./styles/BgAnimation.css";
import Navbar from "./components/Navbar";
import TodayWeather from "./components/today_components/TodayWeather";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
      {/* <Navbar /> */}
      <AppRouter />
      {/* <TodayWeather /> */}
    </div>
  );
}

export default App;
