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
    roundTimeQuarterHour("2023-11-17T11:26");
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  
  const getRoundTemp = (temp: any) => {
    return Math.round(temp) + weatherData.daily_units.temperature_2m_min;
  };


  const roundTimeQuarterHour = (time: any) => {
    let round = 1000 * 60 * 15;
    let date = new Date(time);
    let timeToReturn = new Date(Math.floor(date.getTime() / round) * round);

    let returnHours = timeToReturn.getHours();
    let currentHours = ("0" + returnHours).slice(-2);
    let timeResult = currentHours + ":" + timeToReturn.getMinutes();
    console.log(timeResult);
    // return timeToReturn;
  };

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
                  <div className="currentDataBox">
                    <div className="circle">
                      <WeatherImg
                        sharedCode={weatherData.daily.weather_code[0]}
                        hourlyCheck={false}
                      />
                    </div>

                    <div className="tempDescrBox">
                      <h1>Hilden</h1>
                      <h2>
                        H:{getRoundTemp(weatherData.daily.temperature_2m_max)}{" "}
                        L:{getRoundTemp(weatherData.daily.temperature_2m_min)}
                      </h2>
                    </div>
                  </div>

                  <HourlyWeather
                    time={weatherData.hourly.time}
                    code={weatherData.hourly.weather_code}
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
