import { useState } from "react";
import { useFetching } from "../hooks/useFetching";
import CoordinatesService from "../API/coordinatesService";
import CurrentWeather from "./currentWeather_components/CurrentWeather";


const CityInputChoose = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(Object);
  const [show, setShow] = useState(false);

  const [fetchAPIData, postError] = useFetching(async () => {
    const cData = await CoordinatesService.fetchCoordinateAPI(inputValue);
    setCityData(cData.results[0]);
    setShow(true);
  });


  const handleSearchCity = () => {
    fetchAPIData(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={handleSearchCity}>search</button>

      {show ? (
        <CurrentWeather
          latitude={cityData.latitude}
          longitude={cityData.longitude}
          name={cityData.name}
        />
      ) : null}
    </div>
  );
};

export default CityInputChoose;
