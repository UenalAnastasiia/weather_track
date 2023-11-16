import { useState, useEffect } from "react";

const WeatherImg = (data: any) => {
  const [showIcon, setShowIcon] = useState(null);

  useEffect(() => {
    checkIcon();
  }, []);

  const checkIcon = () => {
    if (data.sharedCode === 0) {
      setShowIcon("../assets/icon_sun.png");
    }

    if (
      data.sharedCode === 1 ||
      data.sharedCode === 2 ||
      data.sharedCode === 3
    ) {
      setShowIcon("../assets/icon_cloud.png");
    }

    if (data.sharedCode === 45 || data.sharedCode === 48) {
      setShowIcon("../assets/icon_fog.png");
    }

    if (
      data.sharedCode === 51 ||
      data.sharedCode === 53 ||
      data.sharedCode === 55 ||
      data.sharedCode === 56 ||
      data.sharedCode === 57 
    ) {
      setShowIcon("../assets/icon_little_rain.png");
    }

    if (
      data.sharedCode === 61 ||
      data.sharedCode === 63 ||
      data.sharedCode === 65
    ) {
      setShowIcon("../assets/icon_rain.png");
    }

    if (data.sharedCode === 66 || data.sharedCode === 67) {
      setShowIcon("../assets/icon_snow_rain.png");
    }

    if (
      data.sharedCode === 71 ||
      data.sharedCode === 73 ||
      data.sharedCode === 75 
    ) {
      setShowIcon("../assets/icon_little_snow.png");
    }

    if (
      data.sharedCode === 77 
    ) {
      setShowIcon("../assets/icon_snow_showers.png");
    }

    if (
      data.sharedCode === 80 ||
      data.sharedCode === 81 ||
      data.sharedCode === 82
    ) {
      setShowIcon("../assets/icon_rain_showers.png");
    }

    if (
      data.sharedCode === 85 ||
      data.sharedCode === 86
    ) {
      setShowIcon("../assets/icon_snow.png");
    }

    if (data.sharedCode === 95) {
      setShowIcon("../assets/icon_chance_of_storm.png");
    }

    if (data.sharedCode === 96 || data.sharedCode === 99) {
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
