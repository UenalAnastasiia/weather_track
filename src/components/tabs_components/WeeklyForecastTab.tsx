import { useState, useEffect } from "react";
import weatherService from "../../API/weatherService";
import { useFetching } from "../../hooks/useFetching";
import WeatherImg from "../weather_infos/WeatherImg";

const WeeklyForecastTab = () => {
  const weeklyLength = Array.from({ length: 7 }, (_, i) => i + 1);
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState(Object);


  const [fetchPosts, postError] = useFetching(async () => {
    const response = await weatherService.fetchWeeklyWeather();
    setDailyData(response.daily);
    setLoading(false);
  });


  useEffect(() => {
    fetchPosts();
  }, []);


  const getRoundTemp = (temp: any) => {
    return Math.round(temp);
  };


  const checkWeekDay = (date: Date) => {
    let sharedDate = new Date(date);
    let sharedWeekDay = sharedDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    return sharedWeekDay;
  };


  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {postError && <h1>Es ist ein Fehler aufgetreten: {postError}</h1>}

          <div className="weeklyForecastTab">
            {weeklyLength.map((element, index) => (
              <span key={index}>
                <p>{checkWeekDay(dailyData.time[element])}</p>
                <WeatherImg sharedCode={dailyData.weather_code[element]} hourlyCheck={true}/>
                <p>H: {getRoundTemp(dailyData.temperature_2m_max[element])}&deg;</p>
                <p>L: {getRoundTemp(dailyData.temperature_2m_min[element])}&deg;</p>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyForecastTab;