import Moment from "react-moment";

const HourlyWeather = (data: any) => {
  return (
    <div>
      <p>
        <Moment format="HH:mm">{data.time[7]}</Moment> :{data.code[7]}
      </p>

      <p>
        <Moment format="HH:mm">{data.time[11]}</Moment> :{data.code[11]}
      </p>

      <p>
        <Moment format="HH:mm">{data.time[15]}</Moment> :{data.code[15]}
      </p>

      <p>
        <Moment format="HH:mm">{data.time[19]}</Moment> :{data.code[19]}
      </p>

      <p>
        <Moment format="HH:mm">{data.time[23]}</Moment> :{data.code[23]}
      </p>
    </div>
  );
};

export default HourlyWeather;
