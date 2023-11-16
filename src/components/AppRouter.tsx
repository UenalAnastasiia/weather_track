import React, { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import TodayWeather from './today_components/TodayWeather';
import HourlyWeather from './today_components/HourlyWeather';
import CurrentWeather from './today_components/CurrentWeather';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/"></Route>
        <Route path="/current" element={<CurrentWeather />}></Route>
        <Route path="/today" element={<TodayWeather />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
