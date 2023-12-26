import { Fragment } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import TodayWeather from './today_components/TodayWeather';
import CurrentWeather from './currentWeather_components/CurrentWeather';
import CityInputChoose from './CityInputChoose';
import CityNavbar from './CityNavbar';
import Home from './Home';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/track" replace={true} />}></Route>
        <Route path="/track" element={<Home />}></Route>
        <Route path="/search" element={<CityInputChoose />}></Route>
        <Route path="/overview" element={<CityNavbar />}></Route>
        <Route path="/current/:city" element={<CurrentWeather />}></Route>
        <Route path="/today" element={<TodayWeather />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
