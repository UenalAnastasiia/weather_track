import "./styles/App.css";
import "./styles/BgAnimation.css";
import "./styles/Tabs.css";
import "./styles/CurrentWeather.css";
import AppRouter from "./components/AppRouter";
import BgAnimation from "./components/BgAnimation";


function App() {

  return (
    <div className="App">
      <BgAnimation />
      <AppRouter />
    </div>
  );
}

export default App;
