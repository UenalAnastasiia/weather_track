import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import TodayWeather from './components/TodayWeather';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TodayWeather />
    </div>
  );
}

export default App;
