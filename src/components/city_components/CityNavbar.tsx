import "../../styles/CityNavbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentWeather from "../currentWeather_components/CurrentWeather";
import WeatherService from "../../API/weatherService";
import CoordinatesService from "../../API/coordinatesService";
import StorageService from "../../services/storageService";
import { Button, ButtonGroup, CircularProgress, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import LightTooltip from "../../UI/LightTooltip";


const CityNavbar = (props) => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [show, setShow] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [cityData, setCityData] = useState(Object);
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
    let fetchCityData = await CoordinatesService.fetchCoordinateAPI(city.name);
    setCityData(fetchCityData.results[0]);    
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
      {show && 
        <div>
          {localLength.length === 1 ? (
            <div className="cityNavDiv">
                <ButtonGroup orientation="vertical" variant="contained" color="secondary">
                    <Button onClick={() => openCityWeather(localItems[0])}>
                      {localItems[0].name}
                    </Button>

                    <LightTooltip title="Add city">
                      <IconButton color="secondary" onClick={() => navigate('/search') }>
                        <AddIcon />
                      </IconButton>
                    </LightTooltip>
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

                    <LightTooltip title="add city">
                      <IconButton color="secondary" onClick={() => navigate('/search') }>
                        <AddIcon />
                      </IconButton>
                    </LightTooltip>
                </ButtonGroup>
            </div>
          )}

          {showSpinner && <CircularProgress />}

          {!reloadData && 
            <div className="currentNavDiv">
                <CurrentWeather key={choosenCityName} name={choosenCityName} weatherData={weatherData} cityData={cityData}/>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default CityNavbar;
