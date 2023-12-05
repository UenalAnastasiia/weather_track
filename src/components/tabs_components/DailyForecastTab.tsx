import Moment from "react-moment";
import WeatherImg from "../weather_infos/WeatherImg";

const DailyForecastTab = (data: any) => {
  const codeNumbers: number[] = [7, 11, 15, 19, 23];

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };

  return (
    <div className="dailyForecastTab">
      <div className="dailyForecastTabBoxLeft">
        {codeNumbers.map((index) => (
          <span key={index}>
            <Moment format="h a">{data.time[index]}</Moment>
            <WeatherImg sharedCode={data.code[index]} hourlyCheck={true} />
            {getRoundTemp(data.temp[index])}&deg;
          </span>
        ))}
      </div>

      <div className="dailyForecastTabBoxRight">
        <span>Wind: </span>
        <span>Regen: </span>
        <span>Gefühlt Temperatur:</span>
      </div>
    </div>
  );
};

export default DailyForecastTab;
