import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

const Compass = (degree) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
    

  const locationHandler = (coords) => {
    const { latitude, longitude } = coords;
  };


  useEffect(() => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    } else if (!isGeolocationEnabled) {
      alert(
        "Geolocation is not enabled, Please allow the location check your setting"
      );
    } else if (coords) {
      locationHandler(coords);
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);


  return (
    <div>
      <div className="compass">
        <div className="compass-circle" />
        <div
          className="arrow"
          style={{ transform: `rotate(${degree.directionDegree}deg)` }}/>
      </div>
    </div>
  );
};

export default Compass;
