import "./styles/App.css";
import AppRouter from "./components/routes/AppRouter";
import BgAnimation from "./components/home_components/BgAnimation";


function App() {

  return (
    <div className="App">
      <h1 className="logoH1">WTrack</h1>
      <BgAnimation />
      <AppRouter />
    </div>
  );
}

export default App;
