import { useEffect, useState } from "react";
import CitySearch from "../city_components/CitySearch";
import CityNavbarMain from "../city_components/CityNavbarMain";
import { CircularProgress } from "@mui/material";
import StorageService from "../../services/storageService";


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
    let index = StorageService.returnIndex();

    if (storedData === null || JSONData.length === 0) {
      setLocalEmpty(true);
    } else {     
      if (JSONData.length === 1) {
        setLocalFirstElement(JSONData[0])
      } else if (JSONData.length > 1 && index !== '') {
        setLocalFirstElement(JSONData[index])
      } else setLocalFirstElement(JSONData[0]); 
      setLocalEmpty(false);
    }
  }
  

  return (
    <div>
      {localEmpty ? (
        <CitySearch />
      ) : (
        <div>
          {showSpinner && <CircularProgress />}
          <CityNavbarMain data={localFirstElement} />
        </div>
      )}
    </div>
  );
};

export default Home;