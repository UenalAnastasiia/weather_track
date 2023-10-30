import { useState, useEffect } from "react";

const CheckWeatherImg = (data: any) => {
  const [showImg, setShowImg] = useState(null);
  useEffect(() => {
    if (data.sharedCode === 0 || data.sharedCode === 1 || data.sharedCode === 2 || data.sharedCode === 3) {
      setShowImg("../assets/clean_sky.jpg");
    }

    if (data.sharedCode === 45 || data.sharedCode === 48) {
      setShowImg("../assets/fog.jpg");
    }

    if (data.sharedCode === 51 || data.sharedCode === 53 || data.sharedCode === 55 || 
        data.sharedCode === 56 || data.sharedCode === 57 || 
        data.sharedCode === 61 || data.sharedCode === 63 || data.sharedCode === 65 || 
        data.sharedCode === 80 || data.sharedCode === 81 || data.sharedCode === 82) {
        setShowImg("../assets/rain.jpg");
    }

    if (data.sharedCode === 66 || data.sharedCode === 67 || 
        data.sharedCode === 71 || data.sharedCode === 73 || data.sharedCode === 75 || 
        data.sharedCode === 77 || data.sharedCode === 85 || data.sharedCode === 86) {
        setShowImg("../assets/snow.jpg");
    }

    if (data.sharedCode === 95 || data.sharedCode === 96 || data.sharedCode === 99) {
        setShowImg("../assets/thunderstorm.jpg");
    } 
  }, []);

  return (
    <div>
      <img className="weatherImg" src={showImg} />
    </div>
  );
};

export default CheckWeatherImg;