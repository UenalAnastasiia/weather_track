import "../../styles/CityNavbar.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CurrentWeather from "../currentWeather_components/CurrentWeather";
import WeatherService from "../../API/weatherService";
import StorageService from "../../services/storageService";
import { CircularProgress, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const CityNavbar = (props) => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [show, setShow] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [choosenCityName, setchoosenCityName] = useState(Object);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    openCityWeather(props.data); 
  }, []);


  const openCityWeather = async (city) => {
    setReloadData(true);
    setShowSpinner(true);
    WeatherService.getCoordinatesForUrl(city.latitude, city.longitude, city.name);
    setchoosenCityName(city.name);
    StorageService.checkStorageData(city);
    shareDataToNextComponent(city);
  };


  const shareDataToNextComponent = async (city) => {
    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather);

    setTimeout(() => {
      setShow(true);
      setReloadData(false);
      setShowSpinner(false);
    }, 1000);
  }


  return (
    <div>
      {show ? (
        <div>
          {localLength.length === 1 ? (
            <div className="cityNavDiv">
                <ButtonGroup orientation="vertical" variant="contained" color="secondary">
                    <Button onClick={() => openCityWeather(localItems[0])}>
                      {localItems[0].name}
                    </Button>

                    <IconButton color="secondary" onClick={() => navigate('/search') }>
                      <AddIcon />
                    </IconButton>
                </ButtonGroup>
            </div>
          ) : (
            <div className="cityNavDiv">
              <ButtonGroup key={1} orientation="vertical" variant="contained" color="secondary">
                {localLength.map((index) => (
                  <Button key={index} onClick={() => openCityWeather(localItems[index])}>
                    {localItems[index].name}
                  </Button>
                ))}

                  <IconButton color="secondary" onClick={() => navigate('/search') }>
                    <AddIcon />
                  </IconButton>
              </ButtonGroup>
            </div>
          )}

          {showSpinner ? <CircularProgress /> : null}

          {!reloadData ? (
            
            <div className="currentNavDiv">
                <CurrentWeather key={choosenCityName} name={choosenCityName} weatherData={weatherData} />
            </div>
            ) : null
          }
        </div>
      ) : null}
    </div>
  );
};

export default CityNavbar;
