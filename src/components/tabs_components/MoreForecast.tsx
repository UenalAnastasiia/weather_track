import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import WeatherImg from "../weather_infos/WeatherImg";
import CurrentWeather from "../currentWeather_components/CurrentWeather";
import { Link } from "react-router-dom";
import { setTimeout } from "timers/promises";

const MoreForecast = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);
  const [isVisible, setIsVisible] = useState(true);

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchWeeklyWeather();
    setWeatherData(response);
    // console.log(response);

    setLoading(false);
  });


  useEffect(() => {
    fetchPosts();
  }, []);


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const handleClick = () => {
    setIsVisible(false);
};

  return (
    <div className={isVisible ? 'btndiv' : 'btndivhidden'}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

          <div className="moreForecastTab">
            {Array.from(Array(16).keys()).map((element, index) => (
                <span key={index}>
                    <p>{weatherData.daily.time[element]}</p>
                    <WeatherImg sharedCode={weatherData.daily.weather_code[element]} hourlyCheck={true}/>
                    <p>H: {getRoundTemp(weatherData.daily.temperature_2m_max[element])}&deg;</p>
                    <p>L: {getRoundTemp(weatherData.daily.temperature_2m_min[element])}&deg;</p>
                </span>
            ))}

                <button key='button' onClick={handleClick}>
                    BACK
                </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreForecast;
