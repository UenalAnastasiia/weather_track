import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CurrentWeather from "./currentWeather_components/CurrentWeather";
import WeatherService from "../API/weatherService";
import StorageService from "../services/storageService";

const CityNavbar = (props) => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [choosenCityName, setchoosenCityName] = useState(Object);

  useEffect(() => {
    openCityWeather(props.data);
  }, []);


  const openCityWeather = async (city) => {
    WeatherService.getCoordinatesForUrl(city.latitude, city.longitude);
    setchoosenCityName(city.name);

    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather);

    StorageService.checkStorageData(city);

    setTimeout(() => {
      setShow(true);
    }, 1000);
  };


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
                </ButtonGroup>
            </div>
          ) : (
            <div className="cityNavDiv">
              {localLength.map((index) => (
                <ButtonGroup key={index} orientation="vertical" variant="contained" color="secondary">
                  <Button key={index} onClick={() => openCityWeather(localItems[index])}>
                    {localItems[index].name}
                  </Button>
                </ButtonGroup>
              ))}
            </div>
          )}

          <div className="currentNavDiv">
            <CurrentWeather key={choosenCityName} name={choosenCityName} weatherData={weatherData} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CityNavbar;
