import "../../styles/Tabs.css";
import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import WeatherImg from "../weather_infos/WeatherImg";
import { DialogModal } from "../../interfaces/DialogModal";
import { Dialog, IconButton } from "@mui/material";
import LineChartUI from "../../UI/LineChartUI";
import CloseIcon from "@mui/icons-material/Close";


const MoreForecastTab = (props: DialogModal) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(Object);
  const { onCloseDialog, openDialog } = props;
  const [chartData, setChartData] = useState(Object);

  const [fetchAPIData, postError] = useFetching(async () => {
    const response = await weatherService.fetchWeeklyWeather();
    setWeatherData(response);
    setLoading(false);
    pushChartData(response.daily)
  });
  console.log = console.warn = console.error = () => {};


  useEffect(() => {
    fetchAPIData();
  }, []);


  const pushChartData = (data: any) => {
    let maxData = [];
    let minData = [];
    let xLabels = [];

    for (let index = 0; index < 10; index++) {
      maxData.push(data.temperature_2m_max[index]);
      minData.push(data.temperature_2m_min[index]);
      xLabels.push(getDateFormat(data.time[index]))
    }

    setChartData({maxData: maxData, minData: minData, xLabels: xLabels});
  };


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const getDateFormat = (data) => {
    const today = new Date(data);
    const currDate = today.toLocaleDateString("en-us", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return `${currDate}`;
  };

  
  const handleCloseDialog = () => {
    onCloseDialog();
  };
  

  return (
    <div className="moreForecastDialog">
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div>
            {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

              <IconButton onClick={handleCloseDialog} className="moreForecastCloseBtn">
                  <CloseIcon style={{ color: "white", fontSize: 24 }}/>
              </IconButton>

            <h1 className="moreForcastTabH1">Forecast for 10 days</h1>

            <div className="moreForecastTab">
              {Array.from(Array(10).keys()).map((element, index) => (
                <span key={index}>
                  <p>{getDateFormat(weatherData.daily.time[element])}</p>
                  <WeatherImg
                    sharedCode={weatherData.daily.weather_code[element]}
                    hourlyCheck={true}
                  />
                <div className="moreForecastTabDiv">
                  <p>H:{getRoundTemp(weatherData.daily.temperature_2m_max[element])}&deg;</p>
                  <p>L:{getRoundTemp(weatherData.daily.temperature_2m_min[element])}&deg;</p>
                </div>
                </span>
              ))}
            </div>

            <LineChartUI maxData={chartData.maxData} minData={chartData.minData} xLabels={chartData.xLabels} amount={2}
            desciption={{min: 'Min' + weatherData.daily_units.temperature_2m_min, max: 'Max' + weatherData.daily_units.temperature_2m_max}}/>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default MoreForecastTab;
