import Moment from "react-moment";
import WeatherImg from "./WeatherImg";

const HourlyWeather = (data: any) => {
  const codeNumbers:number[] = [7, 11, 15, 19, 23];

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };

  return (
    <div className="hourlyWeather">
      {codeNumbers.map((index) => (
        <span key={index}>
          <Moment format="HH:mm">{data.time[index]}</Moment>
          <WeatherImg sharedCode={data.code[index]} hourlyCheck={true} />
          {getRoundTemp(data.temp[index])}&deg;
        </span>
      ))}
    </div>
  );
};

export default HourlyWeather;