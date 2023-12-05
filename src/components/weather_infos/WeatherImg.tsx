import { useState, useEffect } from "react";

const WeatherImg = (data: any) => {
  const [showIcon, setShowIcon] = useState(null);

  useEffect(() => {
    checkIcon();
  }, []);

  const checkIcon = () => {
    let checkedCode = data.sharedCode;

    if (checkedCode === 0) {
      setShowIcon("../assets/icon_sun.png");
    }

    if (checkedCode === 1 || checkedCode === 2 || checkedCode === 3) {
      setShowIcon("../assets/icon_cloud.png");
    }

    if (checkedCode === 45 || checkedCode === 48) {
      setShowIcon("../assets/icon_fog.png");
    }

    if (checkedCode === 51 || checkedCode === 53 || checkedCode === 55 || checkedCode === 56 || checkedCode === 57) {
      setShowIcon("../assets/icon_little_rain.png");
    }

    if (checkedCode === 61 || checkedCode === 63 || checkedCode === 65) {
      setShowIcon("../assets/icon_rain.png");
    }

    if (checkedCode === 66 || checkedCode === 67) {
      setShowIcon("../assets/icon_snow_rain.png");
    }

    if (checkedCode === 71 || checkedCode === 73 || checkedCode === 75) {
      setShowIcon("../assets/icon_little_snow.png");
    }

    if (checkedCode === 77) {
      setShowIcon("../assets/icon_snow_showers.png");
    }

    if (checkedCode === 80 || checkedCode === 81 || checkedCode === 82) {
      setShowIcon("../assets/icon_rain_showers.png");
    }

    if (checkedCode === 85 || checkedCode === 86) {
      setShowIcon("../assets/icon_snow.png");
    }

    if (checkedCode === 95) {
      setShowIcon("../assets/icon_chance_of_storm.png");
    }

    if (checkedCode === 96 || checkedCode === 99) {
      setShowIcon("../assets/icon_slight_storm.png");
    }
  };

  return (
    <div>
      {data.hourlyCheck === true ? (
        <div>
          <img className="weatherIcon" src={showIcon} />
        </div>
      ) : (
        <img className="weatherBG" src={showIcon} />
      )}
    </div>
  );
};

export default WeatherImg;
