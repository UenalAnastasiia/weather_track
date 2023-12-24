import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


const CityNavbar = () => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  return (
    <div>
      {localLength.length === 1 ? (
        <div className="cityNavDiv">
            <Button>
                {localItems[0]}
            </Button>
        </div>
      ) : (
        <div className="cityNavDiv">
          {localLength.map((index) => (
            <ButtonGroup key={index}
              orientation="vertical"
              variant="contained"
              color="secondary">
              <Button key={index} onClick={() => console.log('Clicked button: ', localItems[index])}>
                {localItems[index]}
              </Button>
            </ButtonGroup>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityNavbar;
