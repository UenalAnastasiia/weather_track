import { Fragment } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import TodayWeather from './today_components/TodayWeather';
import HourlyWeather from './tabs_components/DailyForecastTab';
import CurrentWeather from './currentWeather_components/CurrentWeather';
import CityInputChoose from './CityInputChoose';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace={true} />}></Route>
        <Route path="/search" element={<CityInputChoose />}></Route>
        <Route path="/current/:city" element={<CurrentWeather />}></Route>
        <Route path="/today" element={<TodayWeather />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
