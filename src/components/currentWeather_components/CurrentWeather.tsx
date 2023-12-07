import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import Card from "react-bootstrap/Card";
import WeatherImg from "../weather_infos/WeatherImg";
import WeatherDescription from "../weather_infos/WeatherDescription";
import CurrentTabs from "./CurrentTabs";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CoordinatesService from "../../API/coordinatesService";

const CurrentWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);
  const [inputValue, setInputValue] = useState('');
  const [cityData, setCityData] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    // console.log(todayWeather);

    const cData = await CoordinatesService.fetchCoordinateAPI(inputValue);
    setCityData(cData.results[0]);

    const todayWeather = await weatherService.fetchTodayWeather(cData.results[0].latitude, cData.results[0].longitude);
    setWeatherData(todayWeather);
    setLoading(false);
  });

  // useEffect(() => {
  //   fetchPosts();
  // }, []);


  const handleSearchCity = () => {
    fetchPosts(inputValue);
  }

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const getCurrentData = (weatherInfo: any, data: any, dataTyp: string) => {
    let currdate = roundTimeQuarterHour();
    let dataResult = [];

    for (let index = 0; index < 95; index++) {
      if (weatherInfo.minutely_15.time[index] === currdate && dataTyp === "temperature") {            
        dataResult.push(getRoundTemp(data[index]));
      } else if (weatherInfo.minutely_15.time[index] === currdate && dataTyp === "weatherCode") {
        dataResult.push(data[index]);
      }
    }

    return dataResult[0];
  };


  const getTimeFromDate = (timeData: Date) => {
    let today = new Date(timeData);
    let timeResult = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);

    return timeResult;
  }


  const roundTimeQuarterHour = () => {
    let round = 1000 * 60 * 15;
    let today = new Date();
    let timeToReturn = new Date(Math.floor(today.getTime() / round) * round);

    let timeResult = ("0" + timeToReturn.getHours()).slice(-2) + ":" + ("0" + timeToReturn.getMinutes()).slice(-2);
    let currdateFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ('0' + today.getDate()).slice(-2) + 'T' + timeResult;

    return currdateFormat;
  };


  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setInputValue(e.target.value)} ></input>
        <button onClick={handleSearchCity}>search</button>
      </div>
      <Card className="wrapper">
        {loading && <p>Loading...</p>}
        {!loading && (
          <Card.Body>
            <div className="temp-btn">
              <BottomNavigationAction label="Info" icon={<ThermostatIcon style={{ color: 'white', fontSize: 38 }} />} />
            </div>

            <div>
              {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

              {weatherData && (
                <div>
                  <div className="currentDataBox">
                    <div className="circleBox">
                        <div className="circle">
                            <WeatherImg
                              sharedCode={getCurrentData(weatherData, weatherData.minutely_15.weather_code, 'weatherCode')}
                              hourlyCheck={false} />
                        </div>
                    </div>

                    <div className="tempDescrBox">
                    {cityData && (
                      <h1>{cityData.name}</h1>
                    )}
                      <h1 className="currentTempH1">{getCurrentData(weatherData, weatherData.minutely_15.temperature_2m, 'temperature')}&deg;</h1>
                      <WeatherDescription sharedData={weatherData.daily} />
                      <h2>
                        H:{getRoundTemp(weatherData.daily.temperature_2m_max[0])}&deg;
                        L:{getRoundTemp(weatherData.daily.temperature_2m_min[0])}&deg;
                      </h2>

                      <div className="sunDiv">
                        <span>
                          <img className="sunImg" src="../assets/sunrise.png" />
                          <h3>{getTimeFromDate(weatherData.daily.sunrise[0])}</h3>
                        </span>

                        <span>
                          <img className="sunImg" src="../assets/sunset.png" />
                          <h3>{getTimeFromDate(weatherData.daily.sunset[0])}</h3>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="tabsBox">
                    <CurrentTabs sharedData={weatherData} />
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default CurrentWeather;
