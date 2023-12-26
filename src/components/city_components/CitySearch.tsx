import { useState } from "react";
import CoordinatesService from "../../API/coordinatesService";
import WeatherService from "../../API/weatherService";
import CityNavbar from "./CityNavbar";
import StorageService from "../../services/storageService";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [show, setShow] = useState(false);
  const navigate = useNavigate()


  const fetchAPIData = async (data) => {
    const cData = await CoordinatesService.fetchCoordinateAPI(data);

    try {
      tryFetch(cData.results[0]);
    } catch (e) {
      // alert('City not found');
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
        setShow(true);
    }, 1000);
  }


  const handleSearchCity = () => {
    fetchAPIData(inputValue);
  };


  return (
    <div>
      {show ? (
        <div className="currentNavDiv">
          <CityNavbar data={cityData} />
        </div>
      ) : (
      <div>
        <button onClick={() =>  navigate('/track')}>back</button>
        <input type="text" onChange={(e) => setInputValue(e.target.value)}></input>
        <button onClick={handleSearchCity}>search</button>
      </div>)}
    </div>
  );
};

export default CitySearch;