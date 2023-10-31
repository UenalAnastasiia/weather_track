import Moment from "react-moment";
import WeatherImg from "./WeatherImg";

const HourlyWeather = (data: any) => {
  return (
    <div className="hourlyWeather">
      <span>
        <Moment format="HH:mm">{data.time[7]}</Moment>: {data.code[7]}
        <WeatherImg sharedCode={data.code[7]} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[11]}</Moment>: {data.code[11]}
        <WeatherImg sharedCode={data.code[11]} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[15]}</Moment>: {data.code[15]}
        <WeatherImg sharedCode={data.code[15]} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[19]}</Moment>: {data.code[19]}
        <WeatherImg sharedCode={data.code[19]} />
      </span>

      <span>
        <Moment format="HH:mm">{data.time[23]}</Moment>: {data.code[23]}
        <WeatherImg sharedCode={data.code[23]} />
      </span>
    </div>
  );
};

export default HourlyWeather;