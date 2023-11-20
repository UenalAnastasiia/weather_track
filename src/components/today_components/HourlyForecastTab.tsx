import Moment from "react-moment";
import WeatherImg from "./WeatherImg";

const HourlyForecastTab = (data: any) => {

  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const roundTimeToHour = () => {
    let round = 1000 * 60 * 60;
    let today = new Date();
    let timeToReturn = new Date(Math.floor(today.getTime() / round) * round);

    let timeResult = ("0" + timeToReturn.getHours()).slice(-2) + ":" + ("0" + timeToReturn.getMinutes()).slice(-2);
    let currdateFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + timeResult;

    return currdateFormat
  };


  const findIndexFromCurrentHour = (): number => {
    let currdate = roundTimeToHour();
    let indexResult = [];

    for (let index = 0; index < data.quarterData.time.length; index++) {
        if (data.quarterData.time[index] === currdate) {            
            indexResult.push(index)
        }
    }
    
    return indexResult[0];
  };


  const getCurrentHour = (): number[] => {
    let findIndex = findIndexFromCurrentHour();
    let indexNumbers = [];

    for (let index = 0; index < 24; index++) {
        indexNumbers.push(findIndex + 4 * index);  
    }

    return indexNumbers;
  }


  return (
    <div className="hourlyForecastTab">
      <div className="hourlyForecastDiv">
        {getCurrentHour().map((index) => (
          <span key={index}>
            <Moment format="HH:mm">{data.quarterData.time[index]}</Moment>
            <WeatherImg sharedCode={data.quarterData.weather_code[index]} hourlyCheck={true} />
            {getRoundTemp(data.quarterData.temperature_2m[index])}&deg;
          </span>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastTab;
