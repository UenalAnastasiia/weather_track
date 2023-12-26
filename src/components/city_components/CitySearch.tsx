import React, { useState } from "react";
import CoordinatesService from "../../API/coordinatesService";
import WeatherService from "../../API/weatherService";
import CityNavbar from "./CityNavbar";
import StorageService from "../../services/storageService";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CitySearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [showWeather, setShowWeather] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()


  const fetchAPIData = async (data) => {
    const cData = await CoordinatesService.fetchCoordinateAPI(data);

    try {
      tryFetch(cData.results[0]);
    } catch (e) {
      // alert('City not found');
      setOpen(true);
      console.error(e);
      return <CitySearch /> 
    }
  }


  const tryFetch = (data) => {
    setCityData({name: data.name, latitude: data.latitude, longitude: data.longitude});
      WeatherService.getCoordinatesForUrl(
        data.latitude,
        data.longitude
      ); 

      StorageService.checkStorageData({name: data.name, latitude: data.latitude, longitude: data.longitude})
      navigate('/track');
      setTimeout(() => {
        setShowWeather(true);
        setShowSpinner(false);
      }, 1000);
  }


  const handleSearchCity = () => {
    fetchAPIData(inputValue);
    setShowSpinner(true);
  };


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setShowSpinner(false);
    setInputValue("");
  };


  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };


  return (
    <div>
      {showSpinner ? <CircularProgress /> : null}

      {showWeather ? (
        <div className="currentNavDiv">
          <CityNavbar data={cityData} />
        </div>
      ) : (
      <div>
        <button onClick={() =>  navigate('/track')}>back</button>
        <input value={inputValue} type="text" onChange={handleChangeInput}></input>
        <button onClick={handleSearchCity}>search</button>
      </div>)}

      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        Error, city not found!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CitySearch;