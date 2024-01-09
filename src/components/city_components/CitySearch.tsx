import "../../styles/SearchBox.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoordinatesService from "../../API/coordinatesService";
import WeatherService from "../../API/weatherService";
import CityNavbarMain from "./CityNavbarMain";
import StorageService from "../../services/storageService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar, TextField, Button, Box } from '@mui/material';
import Loader from "../../UI/Loader";
import Autocomplete from '@mui/material/Autocomplete';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 
const CitySearch = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [cityData, setCityData] = useState(Object);
  const [showWeather, setShowWeather] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [cityList, setCityList] = useState([]);
  const navigate = useNavigate();


  const sxStyle = {
      field: { background: '#7e63c5db', color: 'white !important', boxShadow: '0px 0px 18px 3px #fdfdfdad', 
      '&.css-hjtp1-MuiInputBase-root-MuiOutlinedInput-root': { background: '#7e63c5db', color: 'white', boxShadow: '0px 0px 18px 3px #fdfdfdad' },
      '&.css-1u3bzj6-MuiFormControl-root-MuiTextField-root': { width: '320px' },
      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white !important' } },
      label: { color: 'white !important' },
      input: { color: 'white !important' } }
  }


  useEffect(() => {
    const storedData = localStorage.getItem("WeatherCity");
    let JSONData = JSON.parse(storedData);

    if (storedData === null || JSONData.length === 0) {
      setFirstOpen(true);
      setShowBackBtn(false);
    } else {
      setFirstOpen(false);
      setShowBackBtn(true);
    }
  }, []);


  const fetchAPIData = async (data) => {
    if (StorageService.storageLimitReached()) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/track');
      }, 2000);
    } else {
      const cData = await CoordinatesService.fetchCoordinateAPI(data.name);
      try { tryFetch(cData.results[0]); } 
      catch (e) {
        // setSnackbarMessage('Error, city not found!');
        // setOpenSnackbar(true);
        console.error(e);
        return <CitySearch /> 
      }
    }
  }


  const tryFetch = (data) => {
    setCityData({name: data.name, latitude: data.latitude, longitude: data.longitude, timezone: data.timezone, code: data.country_code});
      WeatherService.getCoordinatesForUrl(
        data.latitude,
        data.longitude,
        data.name
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
    setOpenSnackbar(false);
    setShowSpinner(false);
    setInputValue("");
  };


  const handleChangeInput = (e) => {
    showCityList(e.target.value);  
  };


  const showCityList = async (e) => {
    const data = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${e}`);
    const jsonData = await data.json();

    let list = [];
    if (jsonData.results) {
      for (let index = 0; index < jsonData.results.length; index++) {
        list.push({name: jsonData.results[index].name, country: jsonData.results[index].country_code});
      }
      setCityList(list);
    }    
  }


  return (
    <div>
      {showSpinner ? <Loader /> : (
        <div>
          {showWeather ? (
            <div className="currentNavDiv">
              <CityNavbarMain data={cityData} />
            </div>
            ) 
            : (
            <div className="welcomeSearchBox">
              {firstOpen && <h1 className="welcomeH1">Welcome to weather tracking App</h1>}

              <div className="searchBox">
                <h1>Search Your City</h1>
                <div className="inputFieldBox">
                  <Autocomplete sx={{ width: 300 }} options={cityList} 
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => setInputValue(value)}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://hatscripts.github.io/circle-flags/flags/${option.country.toLowerCase()}.svg`}
                          // srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
                          // src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.name}
                      </Box>
                    )}
                    
                    renderInput={(params) => 
                      <TextField {...params} sx={sxStyle.field} label="City" 
                        value={inputValue} 
                        onChange={handleChangeInput}
                         placeholder="Enter city name" 
                      />}
                  />
                    
                  <div className="searchBtns">
                    {showBackBtn && <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')}>back</Button>}
                    <Button variant="contained" color="secondary" onClick={handleSearchCity} disabled={!inputValue}>search</Button>
                  </div> 
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      <Snackbar open={openSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          City Limit has been reached
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CitySearch;