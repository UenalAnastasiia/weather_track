import "../../styles/CurrentWeather.css";
import "../../styles/Tabs.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import WeatherImg from "../weather_infos/WeatherImg";
import WeatherDescription from "../weather_infos/WeatherDescription";
import CurrentTabs from "./CurrentTabs";
import WeatherService from "../../API/weatherService";
import StorageService from "../../services/storageService";
import { Button, Popover, Typography } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import CityInfo from "./CityInfo";


const CurrentWeather = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) };
  const handlePopoverClose = () => { setAnchorEl(null) };
  const open = Boolean(anchorEl);


  const fetchAPIData = async () => {
    setWeatherData(props.weatherData);
    setLoading(false);
  };


  useEffect(() => {
    fetchAPIData();   
  }, []);


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const getCurrentData = (weatherInfo: any, data: any, dataTyp: string) => {
    let currdate = roundTimeQuarterHour();
    let dataResult = [];

    for (let index = 0; index < 192; index++) {
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
    let timezoneURL = WeatherService.timezoneURL[0].country + '/' + WeatherService.timezoneURL[0].city;
    
    let round = 1000 * 60 * 15;
    let cityData = new Date().toLocaleString("en-US", {timeZone: timezoneURL});
    let today = new Date(cityData);
 
    let timeToReturn = new Date(Math.floor(today.getTime() / round) * round);

    let timeResult = ("0" + timeToReturn.getHours()).slice(-2) + ":" + ("0" + timeToReturn.getMinutes()).slice(-2);
    let currdateFormat = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2) + 'T' + timeResult;

    return currdateFormat;
  };


  return (
    <div>
      <Card className="wrapper">
        {loading && <p>Loading...</p>}
        {!loading && (
          <Card.Body>
            <div>
            <Button className="calendarBtn" onClick={() => navigate('/history')}>
                    <CalendarIcon style={{ color: "#F02222", fontSize: 32 }} />
            </Button>

            <img className="countryFlagImg" src={StorageService.imgURL || ''} />

              {weatherData && (
                <div>
                  <div className="currentDataBox">
                    <div className="circleBox">
                      <div className="circle">
                        <WeatherImg sharedCode={getCurrentData(weatherData, weatherData.minutely_15.weather_code, "weatherCode")}
                          hourlyCheck={false} />
                      </div>
                    </div>

                    <div className="tempDescrBox">
                      <Typography aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                         <span className="cityNameSpan">{props.name}</span>
                      </Typography>

                      <Popover id="mouse-over-popover"
                          sx={{ pointerEvents: 'none' }} open={open} anchorEl={anchorEl}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus>
                          <CityInfo cityData={props.cityData} />
                      </Popover>

                      <h1 className="currentTempH1">{getCurrentData(weatherData, weatherData.minutely_15.temperature_2m, "temperature")}&deg; </h1>
                      <WeatherDescription sharedData={weatherData.daily} />
                      <h2>
                        Max: {getRoundTemp(weatherData.daily.temperature_2m_max[0])}&deg; 
                        Min: {getRoundTemp(weatherData.daily.temperature_2m_min[0])}&deg;
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