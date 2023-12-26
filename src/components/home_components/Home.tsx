import { useEffect, useState } from "react";
import CitySearch from "../city_components/CitySearch";
import CityNavbar from "../city_components/CityNavbar";

const Home = () => {
  const [localEmpty, setLocalEmpty] = useState(true);
  const [localFirstElement, setLocalFirstElement] = useState(Object);

  useEffect(() => {
    checkStorage();
  }, []);


  const checkStorage = () => {
    const storedData = localStorage.getItem("WeatherCity");
    let JSONData = JSON.parse(storedData);

    if (storedData === null || JSONData.length === 0) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    } else {
      JSONData.length === 1 ? setLocalFirstElement(JSONData[0]) : setLocalFirstElement(JSONData[JSONData.length - 1]);
      setLocalEmpty(false);
    }
  }
  

  return (
    <div>
      {localEmpty ? (
        <CitySearch />
      ) : (
        <CityNavbar data={localFirstElement} />
      )}
    </div>
  );
};

export default Home;
