import { useState } from "react";
import CoordinatesService from "../API/coordinatesService";
import WeatherService from "../API/weatherService";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CityNavbar from "./CityNavbar";
import StorageService from "../services/storageService";

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
      tryFetch(cData.results[0]);
    } catch (e) {
      // alert('City not found');
      console.error(e);
      handleOpenSearchModal();
      return <CityInputChoose /> 
    }
  }


  const tryFetch = (data) => {
    setCityData({name: data.name, latitude: data.latitude, longitude: data.longitude});
      WeatherService.getCoordinatesForUrl(
        data.latitude,
        data.longitude
      ); 

      StorageService.checkStorageData({name: data.name, latitude: data.latitude, longitude: data.longitude})

      setTimeout(() => {
        setShow(true);
    }, 1000);
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
          <CityNavbar data={cityData} />
        </div>
      ) : null}
    </div>
  );
};

export default CityInputChoose;