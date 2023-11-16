import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import Card from "react-bootstrap/Card";
import WeatherImg from "./WeatherImg";
import HourlyWeather from "./HourlyWeather";

const CurrentWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchTodayWeather();
    setWeatherData(response);
    setLoading(false);
    console.log(response);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Card className="wrapper">
        {loading && <p>Loading...</p>}
        {!loading && (
          <Card.Body>
            <div>
              {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

              {weatherData && (
                <div>
                  <h1>Current weather</h1>
                  <div className="circle">
                    <WeatherImg
                      sharedCode={weatherData.daily.weathercode[0]}
                      hourlyCheck={false}
                    />
                  </div>

                  <HourlyWeather
                    time={weatherData.hourly.time}
                    code={weatherData.hourly.weathercode}
                    temp={weatherData.hourly.temperature_2m}
                    units={weatherData.hourly_units.temperature_2m}
                  />
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
