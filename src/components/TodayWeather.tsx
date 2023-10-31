import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import weatherService from "../API/weatherService";
import { useFetching } from "../hooks/useFetching";
import HourlyWeather from "./HourlyWeather";
import WeatherDescription from "./WeatherDescription";

const TodayWeather = () => {
  const [loading, setLoading] = useState(true);
  const [dailyWeatherData, setDailyWeatherData] = useState(Object);
  const [sunriseTime, setSunriseTime] = useState(Object);
  const [sunsetTime, setSunsetTime] = useState(Object);

  const [fetchPosts, isLoading, postError] = useFetching(async () => {
    const response = await weatherService.fetchTodayWeather();
    setDailyWeatherData(response);
    getSunriseAndSunsetTime(response.daily);
    setLoading(false);
  });


  useEffect(() => {
    fetchPosts();
  }, []);

  
  const getSunriseAndSunsetTime = (data: any) => {
    const sunriseTimeFormat = new Date(data.sunrise).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunriseTime(sunriseTimeFormat);

    const sunsetTimeFormat = new Date(data.sunset).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunsetTime(sunsetTimeFormat);
  };

  return (
    <div>
      <Card className="cardContainer">
        {loading && <p>Loading...</p>}
        {!loading && (
          <Card.Body>
            <div>
              {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

              {dailyWeatherData && (
                <span>
                  <p>
                    <b>Sunrise:</b> {sunriseTime}
                  </p>
                  <p>
                    <b>Sunset:</b> {sunsetTime}
                  </p>
                  <WeatherDescription sharedData={dailyWeatherData.daily} />

                  <h3>Daily weather</h3>
                  <HourlyWeather
                    time={dailyWeatherData.hourly.time}
                    code={dailyWeatherData.hourly.weathercode}
                  />
                </span>
              )}
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default TodayWeather;
