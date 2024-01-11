import { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import CitySearch from '../components/city_components/CitySearch';
import Home from '../components/home_components/Home';
import HistoryWeather from '../components/history/HistoryWeather';
import Imprint from '../components/home_components/Imprint';
import DayHistory from '../components/currentWeather_components/DayHistory';
import WelcomeAnimation from '../components/home_components/WelcomeAnimation';
import AppInfo from '../components/home_components/AppInfo';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<WelcomeAnimation />}></Route>
        <Route path="/track" element={<Home />}></Route>
        <Route path="/search" element={<CitySearch />}></Route>
        <Route path="/history" element={<HistoryWeather />}></Route>
        <Route path="/day" element={<DayHistory />}></Route>
        <Route path="/imprint" element={<Imprint />}></Route>
        <Route path="/info" element={<AppInfo />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;