import { useState, useEffect } from "react";


const CityInfo = (props) => {

    const [localData, setLocalData] = useState(Object);

    useEffect(() => {
        getLocalData();
    }, []);


    const getLocalData = () => {
        let localeDate = new Date().toLocaleString("en-US", {
            timeZone: props.cityData.timezone, 
            weekday: "short",
            month: "short",
            day: "numeric"
        });

        let localeTime = new Date().toLocaleString("en-US", {
            timeZone: props.cityData.timezone, 
            hour: "2-digit", 
            minute: "2-digit"
        });

        setLocalData({date: localeDate, time: localeTime});
    }
    
    
    return (
        <div className="cityInfoBox">
            <span>Locale Date: {localData.date}</span>
            <span>Locale Time: {localData.time}</span>
            <span>Country: {props.cityData.country}</span>
            {props.cityData.admin1 && <span>State: {props.cityData.admin1}</span>}
            {props.cityData.admin2 && <span>District: {props.cityData.admin2}</span>}
            {props.cityData.timezone && <span>Timezone: {props.cityData.timezone}</span>}
            {props.cityData.population && <span>Population: {props.cityData.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>}
        </div>
    );
};

export default CityInfo;