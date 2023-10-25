import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import weatherService from "../API/weatherService";
import { useFetching } from "../hooks/useFetching";
import HourlyWeather from "./HourlyWeather";

const TodayWeather = () => {
  const [loading, setLoading] = useState(true);
  const [dailyWeatherData, setDailyWeatherData] = useState(Object);

  const [fetchPosts, isLoading, postError] = useFetching(async () => {
    const response = await weatherService.fetchTodayWeather();
    console.log("Data", response);

    setDailyWeatherData(response);
    setLoading(false);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

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
                  <p>Sunrise: {dailyWeatherData.daily.sunrise}</p>
                  <p>Sunset: {dailyWeatherData.daily.sunset}</p>
                  <p>Code: {dailyWeatherData.daily.weathercode}</p>

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
