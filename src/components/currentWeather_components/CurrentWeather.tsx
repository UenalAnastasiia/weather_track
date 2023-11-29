import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import Card from "react-bootstrap/Card";
import WeatherImg from "../weather_infos/WeatherImg";
import WeatherDescription from "../weather_infos/WeatherDescription";
import CurrentTabs from "./CurrentTabs";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ThermostatIcon from '@mui/icons-material/Thermostat';

const CurrentWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchTodayWeather();
    setWeatherData(response);
    setLoading(false);
    // console.log(response);
  });


  useEffect(() => {
    fetchPosts();
  }, []);

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const getCurrentTemperature = (data: any) => {
    let currdate = roundTimeQuarterHour();
    let tempResult = [];

    for (let index = 0; index < 95; index++) {
        if (data.minutely_15.time[index] === currdate) {            
            tempResult.push(getRoundTemp(data.minutely_15.temperature_2m[index]))
        }
    }

    return tempResult;
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
    let currdateFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + timeResult;

    return currdateFormat;
  };


  return (
    <div>
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
                                sharedCode={weatherData.daily.weather_code[0]}
                                hourlyCheck={false} />
                        </div>
                    </div>

                    <div className="tempDescrBox">
                      <h1>Hilden</h1>
                      <h1 className="currentTempH1">{getCurrentTemperature(weatherData)}&deg;</h1>
                      <WeatherDescription sharedData={weatherData.daily} />
                      <h2>
                        H:{getRoundTemp(weatherData.daily.temperature_2m_max)}&deg;
                        L:{getRoundTemp(weatherData.daily.temperature_2m_min)}&deg;
                      </h2>

                      <div className="sunDiv">
                        <span>
                          <img className="sunImg" src="../assets/sunrise.png" />
                          <h3>{getTimeFromDate(weatherData.daily.sunrise)}</h3>
                        </span>

                        <span>
                          <img className="sunImg" src="../assets/sunset.png" />
                          <h3>{getTimeFromDate(weatherData.daily.sunset)}</h3>
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
