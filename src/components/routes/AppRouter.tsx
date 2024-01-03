import { Fragment } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import CitySearch from '../city_components/CitySearch';
import Home from '../home_components/Home';
import HistoryWeather from '../HistoryWeather';


const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/track" replace={true} />}></Route>
        <Route path="/track" element={<Home />}></Route>
        <Route path="/search" element={<CitySearch />}></Route>
        <Route path="/history" element={<HistoryWeather />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
