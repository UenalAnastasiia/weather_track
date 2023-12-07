import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import Compass from "../currentWeather_components/Compass";


const DailyForecastTab = (data: any) => {
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState(Object);

  const [fetchPosts, postError] = useFetching(async () => {
    const todayWeather = await weatherService.fetchCurrentWeather();
    setCurrentData(todayWeather);
    setLoading(false);
    // console.log(todayWeather);
  });


  useEffect(() => {
    fetchPosts();
  }, []);


  const getTimeFromDate = (timeData: Date) => {
    let today = new Date(timeData);
    let timeResult =
      ("0" + today.getHours()).slice(-2) +
      ":" +
      ("0" + today.getMinutes()).slice(-2);

    return timeResult;
  };

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const windToTextualDescription = (degree) => {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) return "North Easterly";
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
                <div className="windBox">
                  <div className="windHeader">
                    <img src="../assets/icon_wind.png" />
                    <h3> Wind</h3>
                  </div>

                  <div className="windDescription">
                    <span>
                      <img className="sunImg" src="../assets/icon_compass.png" />
                      {windToTextualDescription(currentData.current.wind_direction_10m)}
                    </span>

                    <span>
                      <img className="sunImg" src="../assets/icon_speed.png" />
                      {currentData.current.wind_speed_10m} km/h
                    </span>
                  </div>
                  <Compass
                    directionDegree={currentData.current.wind_direction_10m}
                  />
                </div>
                {/* <span>Sunrise: {getTimeFromDate(currentData.daily.sunrise[0])}</span>
            <span>Sunset: {getTimeFromDate(currentData.daily.sunset[0])}</span>
            <span>Apparent Temp: {getRoundTemp(currentData.current.apparent_temperature)}&deg;</span>
            <span>precipitation: {currentData.current.precipitation} mm</span>
            <span>wind_direction: {currentData.current.wind_direction_10m} &deg;</span>
            <span>wind_speed: {currentData.current.wind_speed_10m} km/h</span>
            <span>relative_humidity: {currentData.current.relative_humidity_2m} %</span>
            <span>precipitation_sum: {currentData.daily.precipitation_sum} mm</span>
            <span>uv_index: {currentData.daily.uv_index_max} </span> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecastTab;
