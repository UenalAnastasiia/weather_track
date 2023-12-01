import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import WeatherImg from "../weather_infos/WeatherImg";
import { DialogModal } from "../../interfaces/DialogModal";
import { Dialog } from "@mui/material";

const MoreForecast = (props: DialogModal) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);
  const { onCloseDialog, openDialog } = props;

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchWeeklyWeather();
    setWeatherData(response);
    setLoading(false);
  });


  useEffect(() => {
    fetchPosts();
  }, []);


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const handleCloseDialog = () => {
    onCloseDialog();
  };
  

  return (
    <Dialog onClose={handleCloseDialog} open={openDialog}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

          <div className="moreForecastTab">
            {Array.from(Array(16).keys()).map((element, index) => (
              <span key={index}>
                <p>{weatherData.daily.time[element]}</p>
                <WeatherImg
                  sharedCode={weatherData.daily.weather_code[element]}
                  hourlyCheck={true}
                />
                <p>
                  H:{getRoundTemp(weatherData.daily.temperature_2m_max[element])}
                  &deg;
                </p>
                <p>
                  L:{getRoundTemp(weatherData.daily.temperature_2m_min[element])}
                  &deg;
                </p>
              </span>
            ))}

            <button key="button" onClick={handleCloseDialog}>
              BACK
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default MoreForecast;
