import { useState, useEffect } from "react";

const WeatherImg = (data: any) => {
  const [showImg, setShowImg] = useState(null);
  const [showIcon, setShowIcon] = useState(null);


  useEffect(() => {
    checkImgAndIcon();
  }, []);


  const checkImgAndIcon = () => {
    if (data.sharedCode === 0) {
      setShowImg("../assets/clean_sky.jpg");
    }

    if (data.sharedCode === 1 || data.sharedCode === 2 || data.sharedCode === 3) {
      setShowImg("../assets/clean_sky.jpg");
      setShowIcon("../assets/icon_cloud.png");
    }

    if (data.sharedCode === 45 || data.sharedCode === 48) {
      setShowImg("../assets/fog.jpg");
      setShowIcon("../assets/icon_fog.png");
    }

    if (data.sharedCode === 51 || data.sharedCode === 53 || data.sharedCode === 55 || 
        data.sharedCode === 56 || data.sharedCode === 57 || 
        data.sharedCode === 61 || data.sharedCode === 63 || data.sharedCode === 65) {
        setShowImg("../assets/rain.jpg");
        setShowIcon("../assets/icon_little_rain.png");
    }

    if (data.sharedCode === 66 || data.sharedCode === 67) {
      setShowImg("../assets/snow.jpg");
      setShowIcon("../assets/icon_little_snow.png");
    }

    if (data.sharedCode === 80 || data.sharedCode === 81 || data.sharedCode === 82) {
      setShowImg("../assets/rain.jpg");
      setShowIcon("../assets/icon_rain_showers.png");
    }

    if (
      data.sharedCode === 71 || data.sharedCode === 73 || data.sharedCode === 75 || 
      data.sharedCode === 77 || data.sharedCode === 85 || data.sharedCode === 86) {
      setShowImg("../assets/snow.jpg");
      setShowIcon("../assets/icon_snow.png");
    }

    if (data.sharedCode === 95) {
      setShowImg("../assets/thunderstorm.jpg");
      setShowIcon("../assets/icon_chance_of_storm.png");
    } 

    if (data.sharedCode === 96 || data.sharedCode === 99) {
      setShowImg("../assets/thunderstorm.jpg");
      setShowIcon("../assets/icon_slight_storm.png");
    } 
  }


  return (
    <div>
      <img className="weatherImg" src={showImg} />
      <img className="weatherIcon" src={showIcon} />
    </div>
  );
};

export default WeatherImg;