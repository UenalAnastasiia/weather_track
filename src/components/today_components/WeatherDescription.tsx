import { useState, useEffect } from "react";

const WeatherDescription = (data: any) => {
  const [getDescription, setGetDescription] = useState(null);

  useEffect(() => {
    getDescriptionFromWeather();
  }, []);

  const getDescriptionFromWeather = () => {
    let checkedCode = data.sharedData.weather_code[0];

    if (checkedCode === 0) {
        setGetDescription("Clear sky");
    }
  
    if (checkedCode === 1 || checkedCode === 2 || checkedCode === 3) {
        setGetDescription("Mainly clear, partly cloudy, and overcast");
    }
  
    if (checkedCode === 45 || checkedCode === 48) {
        setGetDescription("Fog and depositing rime fog");
    }
  
    if (checkedCode === 51 || checkedCode === 53 || checkedCode === 55) {
          setGetDescription("Drizzle: Light, moderate, and dense intensity");
    }

    if (checkedCode === 56 || checkedCode === 57) {
          setGetDescription("Freezing Drizzle: Light and dense intensity");
    }

    if (checkedCode === 61 || checkedCode === 63 || checkedCode === 65) {
          setGetDescription("Rain: Slight, moderate and heavy intensity");
    }
  
    if (checkedCode === 66 || checkedCode === 67) {
        setGetDescription("Freezing Rain: Light and heavy intensity");
    }

    if (checkedCode === 71 || checkedCode === 73 || checkedCode === 75) {
        setGetDescription("Snow fall: Slight, moderate, and heavy intensity");
    }

    if (checkedCode === 77 || checkedCode === 85 || checkedCode === 86) {
        setGetDescription("	Snow grains");
    }

    if (checkedCode === 80 || checkedCode === 81 || checkedCode === 82) {        
        setGetDescription("Rain showers: Slight, moderate, and violent");
    }

    if (checkedCode === 85 || checkedCode === 86) {
        setGetDescription("Snow showers slight and heavy");
    }
  
    if (checkedCode === 95) {
        setGetDescription("Thunderstorm: Slight or moderate");
    } 
  
    if (checkedCode === 96 || checkedCode === 99) {
        setGetDescription("Thunderstorm with slight and heavy hail");
    } 
  };

  return <div>
    <p><b>Today Weather:</b> {getDescription}</p>
  </div>
};

export default WeatherDescription;
