import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CurrentWeather from "./currentWeather_components/CurrentWeather";
import WeatherService from "../API/weatherService";


const CityNavbar = () => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [choosenCityName, setchoosenCityName] = useState(Object);


  const openCityWeather = async (city) => {
    WeatherService.getCoordinatesForUrl(city.latitude, city.longitude);
    setchoosenCityName(city.name);

    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather);

    checkLocalStorage(city);  

    setTimeout(() => {
        setShow(true);
    }, 1000);
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

    found == true ? console.log('Exist') : pushToLocalStorage(data);
  }


  const pushToLocalStorage = (data) => {
    let JSONdata = JSON.parse(localStorage.getItem("WeatherCity"));
    JSONdata.push({name: data.name, latitude: data.latitude, longitude: data.longitude});
    localStorage.setItem("WeatherCity", JSON.stringify(JSONdata));
  }


  return (
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


        {show ? (
            <div className="currentNavDiv">
            <CurrentWeather key={choosenCityName} name={choosenCityName} weatherData={weatherData}/>
            </div>)
        : null}
    </div>
  );
};

export default CityNavbar;
