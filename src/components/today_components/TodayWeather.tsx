import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import HourlyWeather from "./HourlyWeather";
import WeatherDescription from "./WeatherDescription";
import WeatherImg from "./WeatherImg";

const TodayWeather = () => {
  const [loading, setLoading] = useState(true);
  const [dailyWeatherData, setDailyWeatherData] = useState(Object);
  const [minMaxTemp, setMinMaxTemp] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchTodayWeather();
    setDailyWeatherData(response);
    getSunriseAndSunsetTime(response.daily);
    getMinAndMaxTemp(response);
    setLoading(false);
    console.log(response);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const getSunriseAndSunsetTime = (data: any) => {
    return new Date(data).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMinAndMaxTemp = (data: any) => {
    let minTemp =
      Math.round(data.daily.temperature_2m_min) +
      data.daily_units.temperature_2m_min;
    let maxTemp =
      Math.round(data.daily.temperature_2m_max) +
      data.daily_units.temperature_2m_max;
    setMinMaxTemp({ minTemp, maxTemp });
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
                <div className="todayContainer">
                  <WeatherImg
                    sharedCode={dailyWeatherData.daily.weather_code[0]}
                    hourlyCheck={false}
                  />
                  <div className="todayDataDiv">
                    <p>
                      <b>Sunrise:</b>{" "}
                      {getSunriseAndSunsetTime(dailyWeatherData.daily.sunrise)}
                    </p>

                    <p>
                      <b>Sunset:</b>{" "}
                      {getSunriseAndSunsetTime(dailyWeatherData.daily.sunset)}
                    </p>

                    <p>
                      <b>Min. Temperature:</b> {minMaxTemp.minTemp}{" "}
                    </p>

                    <p>
                      <b>Max. Temperature:</b> {minMaxTemp.maxTemp}{" "}
                    </p>

                    <WeatherDescription sharedData={dailyWeatherData.daily} />

                    <h3>Daily weather</h3>
                    <HourlyWeather
                      time={dailyWeatherData.hourly.time}
                      code={dailyWeatherData.hourly.weather_code}
                      temp={dailyWeatherData.hourly.temperature_2m}
                      units={dailyWeatherData.hourly_units.temperature_2m}
                    />
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

export default TodayWeather;
