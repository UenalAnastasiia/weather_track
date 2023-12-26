import "./styles/App.css";
import AppRouter from "./components/home_components/AppRouter";
import BgAnimation from "./components/home_components/BgAnimation";


function App() {

  return (
    <div className="App">
      <BgAnimation />
      <AppRouter />
    </div>
  );
}

export default App;
