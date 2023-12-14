import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import Compass from "../currentWeather_components/Compass";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterIcon from "@mui/icons-material/Water";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WaterDropDailyIcon from "@mui/icons-material/Opacity";
import UVIndexIcon from "@mui/icons-material/WbSunny";
import CompassIcon from "@mui/icons-material/Explore";
import SpeedIcon from "@mui/icons-material/WindPower";

const DailyForecastTab = () => {
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState(Object);

  const [fetchAPIData, postError] = useFetching(async () => {
    const todayWeather = await weatherService.fetchCurrentWeather();
    setCurrentData(todayWeather);
    setLoading(false);
    console.log(todayWeather);
  });

  useEffect(() => {
    fetchAPIData();
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
    if (degree > 337.5) return "N";
    if (degree > 292.5) return "NW";
    if (degree > 247.5) return "W";
    if (degree > 202.5) return "SW";
    if (degree > 157.5) return "S";
    if (degree > 122.5) return "SE";
    if (degree > 67.5) return "E";
    if (degree > 22.5) return "NE";
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

          <div className="dailyForecastTab">
            {currentData && (
              <div>
                <div className="dailyForecastTabBox">
                  <div className="windBox">
                    <div>
                      <div className="windDescription">
                        <span><ThermostatIcon style={{ color: "white", fontSize: 22 }} /> Feels like: {getRoundTemp(currentData.current.apparent_temperature)}&deg;</span>
                        <span><WaterIcon style={{ color: "white", fontSize: 22 }} /> Humidity: {currentData.current.relative_humidity_2m} %</span>
                      </div>

                      <div className="windDescription">
                        <span><CompassIcon style={{ color: "white", fontSize: 22 }} /> Wind: {windToTextualDescription(currentData.current.wind_direction_10m)}</span>
                        <span><SpeedIcon style={{ color: "white", fontSize: 22 }} /> Speed {currentData.current.wind_speed_10m} km/h</span>
                      </div>

                      <div className="windDescription">
                        <span><WaterDropIcon style={{ color: "white", fontSize: 22 }} /> Precipitation: {currentData.current.precipitation} mm</span>
                        <span><UVIndexIcon style={{ color: "white", fontSize: 22 }} /> UV Index: {currentData.daily.uv_index_max} </span>
                      </div>
                    </div>

                    <Compass directionDegree={currentData.current.wind_direction_10m} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecastTab;
