import "../styles/History.css";
import { useState, useEffect } from "react";
import WeatherService from "../API/weatherService";
import { LineChart } from '@mui/x-charts/LineChart';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import BackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const [startDate, setStartDate] = useState(Date);
    const [endDate, setEndDate] = useState(Date);
    const [showDatepicker, setShowDatepicker] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetchDate();
        setCityName(WeatherService.cityName);
    }, []);


    const fetchDate = () => {
        let start = new Date();
        start.setDate(start.getDate() - 14);

        let end = new Date();
        end.setDate(end.getDate() - 2);
        
        fetchAPIData(dateFormat(start), dateFormat(end));
    }

    
    const fetchAPIData = async (start, end) => {
        const todayWeather = await WeatherService.fetchHistoryWeather(start, end);
        setWeatherData(todayWeather);

        setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    }


    const dateValue = (date, period) => {
        let result = dateFormat(date);
        period === 'start' ? setStartDate(result) : setEndDate(result);
    }


    const dateFormat = (date: Date) => {
        const d = new Date(date);
        let currdateFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        return currdateFormat;
    }


    const fetchNewChart = () => {
        setIsLoading(false);
        setShowDatepicker(false);
        fetchAPIData(startDate, endDate);
    }


    return (
        <div>
            <div className="historyHeader">
                <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="backBtn">
                    <BackIcon style={{ color: "white", fontSize: 24 }} />
                </Button>
                <h2>Weather History from {cityName}</h2>
                <Button variant="contained" color="secondary" onClick={() => setShowDatepicker(true)}>
                    <CalendarIcon style={{ color: "white", fontSize: 24 }} />
                </Button>
            </div>

            {isLoading ? (
                <div>
                    {showDatepicker ? (
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={(date) => { dateValue(date, 'start') }}/>
                                <DatePicker onChange={(date) => { dateValue(date, 'end') }}/>
                            </LocalizationProvider>
                        
                            <Button variant="contained" color="secondary" onClick={fetchNewChart}>
                                Search
                            </Button>
                        </div>) : null
                    }

                    <div className="historyChart">
                        <LineChart
                            width={1000}
                            height={500}
                            series={[
                                { data: weatherData.daily.temperature_2m_mean, label: 'temperature in ' + weatherData.daily_units.temperature_2m_mean, color: '#a41313' }
                            ]}
                            xAxis={[{ scaleType: 'point', data: weatherData.daily.time }]}/>
                    </div>
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default HistoryWeather;