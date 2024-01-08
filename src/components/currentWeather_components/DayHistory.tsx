import "../../styles/History.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import WeatherService from "../../API/weatherService";

const DayHistory = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pastYears = 6;

    useEffect(() => {
        fetchAPIData(new Date());      
    }, []); 

    
    const fetchAPIData = async (date) => {  
        let pastData = [];   
        for (let index = 1; index < 6; index++) {
            let result = (date.getFullYear() - index) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            const fetchedData = await WeatherService.fetchDayHistoryWeather(result);
            if (fetchedData === 'No coordinates') {
                navigate('/track');
            } else {    
                pastData.push(fetchedData);           
            }  
        }
        setWeatherData(pastData);
        setIsLoading(true);
    }

    console.log(weatherData);


    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="dayBackBtn">
                <ArrowBack sx={{color: 'white', fontSize: 24}} />
            </Button>

            <div className='dayHistoryDiv'>
                <h1>Day History</h1>

                {isLoading ? (
                    <div>
                        {Array.from(Array(5).keys()).map((index) => (
                            <div key={index}>
                                {weatherData ? (
                                    <div>
                                        <span>{weatherData[index].daily.time},</span>
                                        <span>{weatherData[index].daily.temperature_2m_mean},</span>
                                        <span>{weatherData[index].daily.weather_code}</span>
                                    </div>
                                ) : <h1>Loading...</h1>}  
                            </div>
                        ))}
                    </div>
                ) : <h1>Loading...</h1>}
                
            </div>
        </div>
    );
};

export default DayHistory;