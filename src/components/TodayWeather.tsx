import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";


const TodayWeather = () => {
  const [loading, setLoading] = useState(true);
  const [dailyWeatherData, setDailyWeatherData] = useState(Object);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=51.1682&longitude=6.9309&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=1"
      );

      const jsonData = await data.json();
      setDailyWeatherData(jsonData);
      setLoading(false);
      console.log("Daily: ", jsonData);
    };

    fetchApi();
  }, []);

  return (
    <div>
      <Card className="cardContainer">
        {loading && <p>Loading...</p>}
        {!loading && (
          <Card.Body>
            <div>
              {dailyWeatherData && (
                <span>
                  <p>Sunrise: {dailyWeatherData.daily.sunrise}</p>
                  <p>Sunset: {dailyWeatherData.daily.sunset}</p>
                  <p>Code: {dailyWeatherData.daily.weathercode}</p>

                  <h3>Daily weather</h3>
                  <p>
                    <Moment format="HH:mm">
                      {dailyWeatherData.hourly.time[7]}
                    </Moment>{" "}
                    :{dailyWeatherData.hourly.weathercode[7]}
                  </p>

                  <p>
                    <Moment format="HH:mm">
                      {dailyWeatherData.hourly.time[11]}
                    </Moment>{" "}
                    :{dailyWeatherData.hourly.weathercode[11]}
                  </p>

                  <p>
                    <Moment format="HH:mm">
                      {dailyWeatherData.hourly.time[15]}
                    </Moment>{" "}
                    :{dailyWeatherData.hourly.weathercode[15]}
                  </p>

                  <p>
                    <Moment format="HH:mm">
                      {dailyWeatherData.hourly.time[19]}
                    </Moment>{" "}
                    :{dailyWeatherData.hourly.weathercode[19]}
                  </p>

                  <p>
                    <Moment format="HH:mm">
                      {dailyWeatherData.hourly.time[23]}
                    </Moment>{" "}
                    :{dailyWeatherData.hourly.weathercode[23]}
                  </p>
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