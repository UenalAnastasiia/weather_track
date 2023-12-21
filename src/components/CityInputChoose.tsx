import { forwardRef, useImperativeHandle, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import CoordinatesService from "../API/coordinatesService";
import CurrentWeather from "./currentWeather_components/CurrentWeather";
import WeatherService from "../API/weatherService";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

  const [fetchAPIData, postError] = useFetching(async () => {
    const cData = await CoordinatesService.fetchCoordinateAPI(inputValue);
    setCityData(cData.results[0]);
    setShow(true);

    WeatherService.getCoordinatesForUrl(
      cData.results[0].latitude,
      cData.results[0].longitude
    );
  });

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
        <CurrentWeather name={cityData.name} />
      ) : // <Link to="/current"><CurrentWeather name={cityData.name} /></Link>
      null}
    </div>
  );
};

export default CityInputChoose;
