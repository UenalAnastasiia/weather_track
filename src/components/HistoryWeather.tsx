import "./../styles/History.css";
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
import dayjs from "dayjs";


const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [clearedFields, setClearedFields] = useState<boolean>(false);
    const navigate = useNavigate();
    const minDateData = dayjs('01/01/2000');
    const maxDateData = dayjs().add(-2, 'day');


    const sxStyle = {
        paper: {
            style: { width: 'min-content', height: 'min-content', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            backgroundColor: 'rgb(53 2 56 / 55%)',
            backdropFilter: 'blur(6px)', borderRadius: '32px', border: 'none', padding: '24px',
            boxShadow: 'rgb(255, 255, 255) 4px 4px 4px, rgb(255, 255, 255) -4px -4px 20px, rgb(255, 255, 255) -4px -4px 20px inset, rgb(255, 255, 255) 4px 4px 20px inset' }
        },
        drop: {
            backdrop: { style: { backgroundColor: 'rgb(174 174 174 / 50%)' } }
        },
        icon: { color: 'white', fontSize: 24 },
        infoIcon: { color: 'white', fontSize: 18, position: 'absolute', top: '24px', right: '-24px' },
        picker: {
            label: { color: 'white !important' },
            input: { color: 'white !important', width: '150px !important' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' } },
            svg: { color: 'white !important' }
        },
        lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important' } }
    }


    useEffect(() => {
        fetchDate();
        setCityName(WeatherService.cityName);        
    }, []);  

    // console.log = console.warn = console.error = () => {};


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
        setIsLoading(false);
        setShowDatepicker(false);
        setShowDatepicker(false);
        fetchAPIData(startDate, endDate);
    }


    const disablePrevDates = (startDate) => {
        const startSeconds = Date.parse(startDate);
        return (date) => {
          return Date.parse(date) > startSeconds;
        } 
    }


    const handleCloseDialog = () => {
        setShowDatepicker(false);
    };


    const onKeyDown = (e) => {
        e.preventDefault();
    };


    const resetDate = () => {
        setClearedFields(true)
    };


    return (
        <div>
            <div className="historyHeader">
                <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="backBtn">
                    <ArrowBack sx={sxStyle.icon} />
                </Button>
        
                <div className="historyHeaderH2">
                    <h2>Weather History from {cityName}</h2>
                    <LightTooltip title="Since 01/01/2000"><Info sx={sxStyle.infoIcon} /></LightTooltip>
                </div>

                <LightTooltip title="Choose date">
                    <Button variant="contained" color="secondary" onClick={() => setShowDatepicker(true)}>
                        <CalendarMonth sx={sxStyle.icon} />
                    </Button>
                </LightTooltip>
            </div>

            {isLoading ? (
                <div>
                    {showDatepicker &&
                        <div>
                            <Dialog onClose={handleCloseDialog} open={showDatepicker} 
                                PaperProps={sxStyle.paper} slotProps={sxStyle.drop}>

                                <div className="datepickerDiv">
                                    <IconButton onClick={handleCloseDialog} className="closeBtn">
                                        <Close sx={sxStyle.icon}/>
                                    </IconButton>
                                    <h1 className="datepickerBoxH1">Choose date</h1>

                                    <div className="datepickerFields">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="Start Date" disableFuture shouldDisableDate={disablePrevDates(endDate)}
                                                onChange={(date) => { dateValue(date, 'start')}} 
                                                slotProps={{textField: {helperText: 'MM/DD/YYYY', placeholder: 'Enter start date', onKeyDown: onKeyDown}}}
                                                sx={sxStyle.picker} 
                                                minDate={minDateData} maxDate={maxDateData}/>

                                            <span>-</span>

                                            <DatePicker label="End Date" disableFuture
                                                onChange={(date) => { dateValue(date, 'end')}}                                        
                                                slotProps={{textField: {helperText: 'MM/DD/YYYY', placeholder: 'Enter end date', onKeyDown: onKeyDown}}}
                                                sx={sxStyle.picker} 
                                                minDate={dayjs(startDate)} maxDate={maxDateData}/>
                                        </LocalizationProvider>
                                    </div>

                                    <Button variant="contained" color="secondary" onClick={fetchNewChart} 
                                        disabled={startDate === '' || endDate === ''}>
                                        Search
                                    </Button>
                                

                                </div>
                            </Dialog>
                        </div>
                    }

                    <div className="historyChart">
                        <LineChart sx={sxStyle.lineChart} width={1000} height={500}
                            series={[
                                { data: weatherData.daily.temperature_2m_mean, 
                                  label: 'temperature in ' + weatherData.daily_units.temperature_2m_mean, 
                                  color: '#a41313' }]}
                            xAxis={[{ scaleType: 'point', data: weatherData.daily.time }]}
                            slotProps={{
                                legend: { labelStyle: { fill: 'white' } },
                            }}
                        />
                    </div>
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default HistoryWeather;