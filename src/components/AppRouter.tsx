import React, { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import TodayWeather from './today_components/TodayWeather';
import HourlyWeather from './tabs_components/DailyForecastTab';
import CurrentWeather from './currentWeather_components/CurrentWeather';
import CityInputChoose from './CityInputChoose';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<CityInputChoose />}></Route>
        <Route path="/current" element={<CurrentWeather />}></Route>
        <Route path="/today" element={<TodayWeather />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
