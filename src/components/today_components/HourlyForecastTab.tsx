import Moment from "react-moment";
import WeatherImg from "./WeatherImg";

const HourlyForecastTab = (data: any) => {
  const codeNumbers = Array.from(Array(24).keys());

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };

  return (
    <div className="hourlyForecastTab">
      <div className="hourlyForecastDiv">
        {codeNumbers.map((index) => (
          <span key={index}>
            <Moment format="HH:mm">{data.time[index]}</Moment>
            <WeatherImg sharedCode={data.code[index]} hourlyCheck={true} />
            {getRoundTemp(data.temp[index])}&deg;
          </span>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastTab;
