import { useState } from "react";
import CoordinatesService from "../API/coordinatesService";
import CurrentWeather from "./currentWeather_components/CurrentWeather";
import WeatherService from "../API/weatherService";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CityNavbar from "./CityNavbar";
import { useNavigate } from "react-router-dom";

const CityInputChoose = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [openSearchModal, setOpenSearchModal] = useState(true);
  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);
  const router = useNavigate();

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const fetchAPIData = async (data) => {
    const cData = await CoordinatesService.fetchCoordinateAPI(data);

    try {
      tryFetch(cData.results[0]);
    } catch (e) {
      // alert('City not found');
      console.error(e);
      handleOpenSearchModal();
      return <CityInputChoose /> 
    }

    loadDataFromAPI();
  }


  const tryFetch = (data) => {
    setCityData(data);
      WeatherService.getCoordinatesForUrl(
        data.latitude,
        data.longitude
      ); 

      checkLocalStorage({name: data.name, latitude: data.latitude, longitude: data.longitude}); 
      setTimeout(() => {
        setShow(true);
        // router(`/current/${data.name}`);
    }, 1000);
  }


  const loadDataFromAPI = async () => {
    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather); 
  }


  const checkLocalStorage = (data) => {
    let storedCities = JSON.parse(localStorage.getItem("WeatherCity"));
    let found = true;

    if (storedCities.length > 0) {
      for(let i = 0; i < storedCities.length; i++) {
        if (storedCities[i].name == data.name) {
          found = true;
          break
        } else found = false;
      }
    } else found = false;

    found == true ? console.log() : pushToLocalStorage(data);
  }


  const pushToLocalStorage = (data) => {
    let JSONdata = JSON.parse(localStorage.getItem("WeatherCity"));
    JSONdata.push({name: data.name, latitude: data.latitude, longitude: data.longitude});
    localStorage.setItem("WeatherCity", JSON.stringify(JSONdata));
  }


  const handleSearchCity = () => {
    fetchAPIData(inputValue);
    setOpenSearchModal(false);
  };


  return (
    <div>
      <Modal
        open={openSearchModal}
        onClose={handleCloseSearchModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <input type="text" onChange={(e) => setInputValue(e.target.value)}></input>
          <button onClick={handleSearchCity}>search</button>
        </Box>
      </Modal>

      {show ? (
        <div className="currentNavDiv">
          <CityNavbar />
          {weatherData && (
          <CurrentWeather key={cityData.name} name={cityData.name} weatherData={weatherData} />)
          }
        </div>
      ) : null}
    </div>
  );
};

export default CityInputChoose;
