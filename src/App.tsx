import "./styles/App.css";
import Navbar from "./components/Navbar";
import TodayWeather from "./components/today_components/TodayWeather";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
      {/* <TodayWeather /> */}
    </div>
  );
}

export default App;
