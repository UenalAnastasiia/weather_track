import Moment from "react-moment";
import WeatherImg from "../weather_infos/WeatherImg";
import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";

const DailyForecastTab = (data: any) => {
  const codeNumbers: number[] = [7, 11, 15, 19, 23];

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    const todayWeather = await weatherService.fetchCurrentWeather();
    setCurrentData(todayWeather);
    setLoading(false);
    console.log(todayWeather);
  });

  useEffect(() => {
    fetchPosts();
  }, []);


  const getTimeFromDate = (timeData: Date) => {
    let today = new Date(timeData);
    let timeResult = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);

    return timeResult;
  }


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (

      <div>
        {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

      <div className="dailyForecastTab">
        {currentData && (
          <div className="dailyForecastTabBox">
            <span>Sunrise: {getTimeFromDate(currentData.daily.sunrise[0])}</span>
            <span>Sunset: {getTimeFromDate(currentData.daily.sunset[0])}</span>
            <span>Apparent Temp: {getRoundTemp(currentData.current.apparent_temperature)}&deg;</span>
            <span>precipitation: {currentData.current.precipitation} mm</span>
            <span>wind_direction: {currentData.current.wind_direction_10m} &deg;</span>
            <span>wind_speed: {currentData.current.wind_speed_10m} km/h</span>
            <span>relative_humidity: {currentData.current.relative_humidity_2m} %</span>
            <span>precipitation_sum: {currentData.daily.precipitation_sum} mm</span>
            <span>uv_index: {currentData.daily.uv_index_max} </span>
          </div>
        )}
      </div>
      </div>
    )}
    </div>
  );
};

export default DailyForecastTab;
