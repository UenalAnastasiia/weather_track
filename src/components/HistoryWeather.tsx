import "../styles/History.css";
import { useState, useEffect } from "react";
import WeatherService from "../API/weatherService";
import { LineChart } from '@mui/x-charts/LineChart';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import BackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";

const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const navigate = useNavigate();


    useEffect(() => {
        fetchAPIData();
        setCityName(WeatherService.cityName);
      }, []);

    
    const fetchAPIData = async () => {
        const todayWeather = await WeatherService.fetchHistoryWeather('2023-12-01', '2023-12-12');
        setWeatherData(todayWeather);

        setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    }


    return (
        <div>
            <div className="historyHeader">
                <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="backBtn">
                    <BackIcon style={{ color: "white", fontSize: 24 }} />
                </Button>
                <h2>Weather History from {cityName}</h2>
                <Button variant="contained" color="secondary">
                    <CalendarIcon style={{ color: "white", fontSize: 24 }} />
                </Button>
            </div>

            {isLoading ? (
                <div className="historyChart">
                    <LineChart
                        width={1000}
                        height={500}
                        series={[
                            { data: weatherData.daily.temperature_2m_mean, label: 'temperature in ' + weatherData.daily_units.temperature_2m_mean, color: '#a41313' }
                        ]}
                        xAxis={[{ scaleType: 'point', data: weatherData.daily.time }]}/>
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default HistoryWeather;