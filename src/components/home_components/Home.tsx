import { useEffect, useState } from "react";
import CitySearch from "../city_components/CitySearch";
import CityNavbar from "../city_components/CityNavbar";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [localEmpty, setLocalEmpty] = useState(true);
  const [localFirstElement, setLocalFirstElement] = useState(Object);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    checkStorage();

    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, []);


  const checkStorage = () => {
    const storedData = localStorage.getItem("WeatherCity");
    let JSONData = JSON.parse(storedData);

    if (storedData === null || JSONData.length === 0) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    } else {
      // setLocalFirstElement(JSONData[0])
      JSONData.length === 1 ? setLocalFirstElement(JSONData[0]) : setLocalFirstElement(JSONData[JSONData.length - 1]);
      setLocalEmpty(false);
    }
  }
  

  return (
    <div>
      {localEmpty ? (
        <CitySearch />
      ) : (
        <div>
          {showSpinner ? <CircularProgress /> : null}
          <CityNavbar data={localFirstElement} />
        </div>
      )}
    </div>
  );
};

export default Home;
