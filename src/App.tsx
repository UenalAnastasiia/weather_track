import "./styles/App.css";
import AppRouter from "./routes/AppRouter";
import BgAnimation from "./components/home_components/BgAnimation";
import WelcomeAnimation from "./components/home_components/WelcomeAnimation";


function App() {

  return (
    <div className="App">
      <WelcomeAnimation />
      <BgAnimation />
      <AppRouter />
    </div>
  );
}

export default App;