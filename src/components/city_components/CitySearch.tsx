import "../../styles/SearchBox.css";
import React, { useEffect, useState } from "react";
import CoordinatesService from "../../API/coordinatesService";
import WeatherService from "../../API/weatherService";
import CityNavbar from "./CityNavbar";
import StorageService from "../../services/storageService";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 
const CitySearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [showWeather, setShowWeather] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const storedData = localStorage.getItem("WeatherCity");
    let JSONData = JSON.parse(storedData);
    storedData === null || JSONData.length === 0 ? setShowBackBtn(false) : setShowBackBtn(true);
  }, []);


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
    setCityData({name: data.name, latitude: data.latitude, longitude: data.longitude, timezone: data.timezone, code: data.country_code});
      WeatherService.getCoordinatesForUrl(
        data.latitude,
        data.longitude
      );

      StorageService.checkStorageData({name: data.name, latitude: data.latitude, longitude: data.longitude, timezone: data.timezone, code: data.country_code})
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
      {showSpinner ? <CircularProgress /> : (
      <div>
        {showWeather ? (
          <div className="currentNavDiv">
            <CityNavbar data={cityData} />
          </div>
          ) : (
          <div className="searchBox">
            <h1>Search Your City</h1>
            <div className="inputFieldBox">
              <TextField label="City" variant="outlined" value={inputValue} onChange={handleChangeInput} color="secondary" placeholder="Enter city name" autoComplete="off"/>
              <div className="searchBtns">
                {showBackBtn ? <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')}>back</Button> : null}
                <Button variant="contained" color="secondary" onClick={handleSearchCity} disabled={!inputValue}>search</Button>
              </div>
              
            </div>
          </div>
        )}
      </div>
      )}


      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        Error, city not found!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CitySearch;