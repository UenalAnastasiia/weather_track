import { Fragment } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import CitySearch from '../components/city_components/CitySearch';
import Home from '../components/home_components/Home';
import HistoryWeather from '../components/history/HistoryWeather';
import Imprint from '../components/home_components/Imprint';
import DayHistory from '../components/currentWeather_components/DayHistory';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/track" replace={true} />}></Route>
        <Route path="/track" element={<Home />}></Route>
        <Route path="/search" element={<CitySearch />}></Route>
        <Route path="/history" element={<HistoryWeather />}></Route>
        <Route path="/day" element={<DayHistory />}></Route>
        <Route path="/imprint" element={<Imprint />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
