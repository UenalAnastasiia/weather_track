import "../../styles/CityNavbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentWeather from "../currentWeather_components/CurrentWeather";
import WeatherService from "../../API/weatherService";
import CoordinatesService from "../../API/coordinatesService";
import StorageService from "../../services/storageService";
import { CircularProgress } from "@mui/material";
import CityNavWithOne from "./CityNavWithOne";
import CityNavWithMulti from "./CityNavWithMulti";


const CityNavbarMain = (props: { data: any; }) => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [showNav, setShowNav] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [cityData, setCityData] = useState(Object);
  const [choosenCityName, setchoosenCityName] = useState(Object);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    openCityWeather(props.data); 
    setSelectedIndex(StorageService.getCityIndex(props.data.name));
  }, [props]);


  const openCityWeather = async (city) => {
    setReloadData(true);
    setShowSpinner(true);

    WeatherService.getCoordinatesForUrl(city.latitude, city.longitude, city.name);
    setchoosenCityName(city.name);
    
    StorageService.checkStorageData(city);
    shareDataToNextComponent();

    let fetchCityData = await CoordinatesService.fetchCoordinateAPI(city.name);
    setCityData(fetchCityData.results[0]);    
  };


  const shareDataToNextComponent = async () => {
    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather);

    setTimeout(() => {
      setShowNav(true);
      setReloadData(false);
      setShowSpinner(false);
    }, 1000);
  }


  const deleteCityFromStorage = (index) => {
    let currentCities = JSON.parse(localStorage.getItem("WeatherCity"));
    currentCities.splice(index, 1); 
    localStorage.setItem("WeatherCity", JSON.stringify(currentCities));
    let result = JSON.parse(localStorage.getItem("WeatherCity"));
    setLocalItems(result);
    checkAfterDeleteCity(result, index);
  }


  const checkAfterDeleteCity = (result: Object[], deletedIndex: number) => {
    if ( result.length === 0) { 
      renderAfterDeleteLastCity();
    } else {
      renderAfterDelete(result, deletedIndex);
    }
  }


  const renderAfterDeleteLastCity = () => {
    setShowSpinner(true);
    setReloadData(true);

    setTimeout(() => {
      setShowSpinner(false);
      localStorage.removeItem("WeatherCity");
      navigate('/');
    }, 2000);
  }


  const renderAfterDelete = (result: Object[], deletedIndex: number) => {
    if (result.length === 1 && deletedIndex !== 0) {
      openCityWeather(result[0]);
      setSelectedIndex(0);
    } else if (result.length > 1 && deletedIndex !== 0) {
      openCityWeather(result[(deletedIndex - 1)]);
      setSelectedIndex((deletedIndex - 1));
    } else if (deletedIndex === 0) {
      openCityWeather(result[0]);
      setSelectedIndex(0);
    }
  }


  const resetApp = () => {
    setShowSpinner(true);
    setReloadData(true);

    setTimeout(() => {
      setShowSpinner(false);
      localStorage.removeItem("WeatherCity");
      navigate('/');
    }, 2000);
  };


  return (
    <div>
      {showNav && 
        <div>
          {localLength.length === 1 ? 
            <CityNavWithOne openCityWeather={openCityWeather} localItems={localItems} resetApp={resetApp}
              setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} deleteCityFromStorage={deleteCityFromStorage}/>
          
          : 
            <CityNavWithMulti openCityWeather={openCityWeather} localItems={localItems} resetApp={resetApp} localLength={localLength}
              setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} deleteCityFromStorage={deleteCityFromStorage}/>
          }


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

export default CityNavbarMain;