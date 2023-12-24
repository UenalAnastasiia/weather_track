import { useState } from "react";
import CoordinatesService from "../API/coordinatesService";
import CurrentWeather from "./currentWeather_components/CurrentWeather";
import WeatherService from "../API/weatherService";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CityNavbar from "./CityNavbar";

const CityInputChoose = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [show, setShow] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(true);
  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);

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
      setCityData(cData.results[0]);
      setShow(true);
      WeatherService.getCoordinatesForUrl(
        cData.results[0].latitude,
        cData.results[0].longitude
      ); 
      checkLocalStorage(cData.results[0].name);  
    } catch (e) {
      // alert('City not found');
      console.error(e);
      handleOpenSearchModal();
      return <CityInputChoose /> 
    }
  }


  const checkLocalStorage = (name: string) => {
    let storedCities = JSON.parse(localStorage.getItem("WeatherCity"));
    let includesName = storedCities.includes(name);

    storedCities.length > 0 ? includesName ? console.log() : pushToLocalStorage(name) : pushToLocalStorage(name);
  }


  const pushToLocalStorage = (name: string) => {
    let data = JSON.parse(localStorage.getItem("WeatherCity"));
    data.push(name);
    localStorage.setItem("WeatherCity", JSON.stringify(data));
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
          <CurrentWeather key={cityData.name} name={cityData.name} />
        </div>
      ) : null}
    </div>
  );
};

export default CityInputChoose;
