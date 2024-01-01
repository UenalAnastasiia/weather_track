import "../styles/History.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WeatherService from "../API/weatherService";
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, IconButton, Button, Dialog } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Close, Info, CalendarMonth, ArrowBack } from "@mui/icons-material";
import LightTooltip from "../UI/LightTooltip";


const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const [startDate, setStartDate] = useState(Date);
    const [endDate, setEndDate] = useState(Date);
    const [dateError, setDateError] = useState(false);
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
        if (todayWeather === 'No coordinates') {
            navigate('/track');
        } else {
            setWeatherData(todayWeather);

            setTimeout(() => {
                setIsLoading(true);
            }, 1000);
        }
    }


    const dateValue = (date, period) => {
        let result = dateFormat(date);
        period === 'start' ? setStartDate(result) : setEndDate(result);
    }


    const dateFormat = (date) => {
        const d = new Date(date);
        let currdateFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        return currdateFormat;
    }


    const fetchNewChart = () => {
        if (startDate > endDate) {
            setDateError(true) 
        } else {
            setDateError(false);
            setIsLoading(false);
            setShowDatepicker(false);
            setShowDatepicker(false);
            fetchAPIData(startDate, endDate);
        }
    }


    const handleCloseDialog = () => {
        setShowDatepicker(false);
    };


    const disablePrevDates = (startDate) => {
        const startSeconds = Date.parse(startDate);
        return (date) => {
          return Date.parse(date) < startSeconds;
        } 
    }


    return (
        <div>
            <div className="historyHeader">
                <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="backBtn">
                    <ArrowBack style={{ color: "white", fontSize: 24 }} />
                </Button>
        
                <div className="historyHeaderH2">
                    <h2>Weather History from {cityName}</h2>
                    <LightTooltip title="Since 01/01/2000"><Info style={{ color: "white", fontSize: 18 }} /></LightTooltip>
                </div>

                <LightTooltip title="Choose date">
                    <Button variant="contained" color="secondary" onClick={() => setShowDatepicker(true)}>
                        <CalendarMonth style={{ color: "white", fontSize: 24 }} />
                    </Button>
                </LightTooltip>
            </div>

            {isLoading ? (
                <div>
                    {showDatepicker &&
                        <div>
                            <Dialog onClose={handleCloseDialog} open={showDatepicker}>
                                <div className="datepickerDiv">
                                    <IconButton onClick={handleCloseDialog} className="closeBtn">
                                        <Close style={{ color: "white", fontSize: 24 }}/>
                                    </IconButton>
                                    <h1 className="datepickerBoxH1">Choose date</h1>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker disableFuture shouldDisableDate={disablePrevDates('01/01/2000')}
                                            onChange={(date) => { dateValue(date, 'start') }} 
                                            slotProps={{
                                                textField: {
                                                helperText: 'MM/DD/YYYY',
                                                placeholder: 'Enter start date'
                                                }
                                        }}/>

                                        <DatePicker disableFuture shouldDisableDate={disablePrevDates(startDate)}
                                            onChange={(date) => { dateValue(date, 'end') }}                                            
                                            slotProps={{
                                                textField: {
                                                helperText: 'MM/DD/YYYY',
                                                placeholder: 'Enter end date'
                                            }
                                        }}/>
                                    </LocalizationProvider>

                                    {dateError && <span className="dateErrorSpan">Error in date</span>}
                                
                                    <Button variant="contained" color="secondary" onClick={fetchNewChart}>
                                        Search
                                    </Button>
                                </div>
                            </Dialog>
                        </div>
                    }

                    <div className="historyChart">
                        <LineChart
                            width={1000}
                            height={500}
                            series={[
                                { data: weatherData.daily.temperature_2m_mean, label: 'temperature in ' + weatherData.daily_units.temperature_2m_mean, color: '#a41313' }
                            ]}
                            xAxis={[{ scaleType: 'point', data: weatherData.daily.time }]}
                            slotProps={{
                                legend: {
                                  labelStyle: {
                                    fill: 'white',
                                  },
                                },
                            }}
                        />
                    </div>
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default HistoryWeather;