import { useState } from "react";


const CityNavbar = () => {
    const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
    const localLength = Array.from(Array(localItems.length).keys());


    return (
        <div className="cityNavDiv">
        {localLength.map((index) => (
          <span key={index}>
            <h2>{localItems[index]}</h2>
          </span>
        ))}
        </div>
    );
};

export default CityNavbar;