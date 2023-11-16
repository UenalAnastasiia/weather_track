import Moment from "react-moment";
import WeatherImg from "./WeatherImg";

const HourlyWeather = (data: any) => {
  const getRoundTemp = (temp: any) => {
    return Math.round(temp) + " " + data.units;
  };

  return (
    <div className="hourlyWeather">
      <span>
        <Moment format="HH:mm">{data.time[7]}</Moment>:{" "}
        {getRoundTemp(data.temp[7])}
        <WeatherImg sharedCode={data.code[7]} hourlyCheck={true} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[11]}</Moment>:{" "}
        {getRoundTemp(data.temp[11])}
        <WeatherImg sharedCode={data.code[11]} hourlyCheck={true} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[15]}</Moment>:{" "}
        {getRoundTemp(data.temp[15])}
        <WeatherImg sharedCode={data.code[15]} hourlyCheck={true} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[19]}</Moment>:{" "}
        {getRoundTemp(data.temp[19])}
        <WeatherImg sharedCode={data.code[19]} hourlyCheck={true} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[23]}</Moment>:{" "}
        {getRoundTemp(data.temp[23])}
        <WeatherImg sharedCode={data.code[23]} hourlyCheck={true} />
      </span>
    </div>
  );
};

export default HourlyWeather;
