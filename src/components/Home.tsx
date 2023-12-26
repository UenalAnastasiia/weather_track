import { useEffect, useState } from "react";
import CityInputChoose from "./CityInputChoose";
import CityNavbar from "./CityNavbar";

const Home = () => {
  const [localEmpty, setLocalEmpty] = useState(true);
  const [localFirstElement, setLocalFirstElement] = useState(Object);

  useEffect(() => {
    checkStorage();
  }, []);


  const checkStorage = () => {
    const storedData = localStorage.getItem("WeatherCity");

    if (storedData === null || JSON.parse(storedData).length === 0) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    } else {
      setLocalFirstElement(JSON.parse(storedData)[0]);
      setLocalEmpty(false);
    }
  }
  

  return (
    <div>
      {localEmpty ? (
        <CityInputChoose />
      ) : (
        <CityNavbar data={localFirstElement} />
      )}
    </div>
  );
};

export default Home;
