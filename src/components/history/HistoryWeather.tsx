import "../../styles/History.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, SetStateAction } from "react";
import WeatherService from "../../API/weatherService";
import { IconButton, Button, Dialog } from "@mui/material";
import { Close, Info, ArrowBack } from "@mui/icons-material";
import LightTooltip from "../../UI/LightTooltip";
import HistoryNavbar from "./HistoryNavbar";
import HistoryDatepicker from "./HistoryDatepicker";
import HistoryLineChart from "./HistoryLineChart";
import Loader from "../../UI/Loader";


const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [dateLength, setDateLength] = useState(14);
    const [labelLengthName, setLabelLengthName] = useState('14 Days');
    const [chartLabelName, setChartLabelName] = useState('Temperature in °C');
    const navigate = useNavigate();
    const [chartParameter, setChartParameter] = useState('temperature_2m_mean');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const chartParameterBtns = [
        {name: 'Temperature', param: 'temperature_2m_mean', label: 'Temperature in °C'},
        {name: 'Daylight Duration', param: 'daylight_duration', label: 'Daylight Duration in hours'},
        {name: 'Sunshine Duration', param: 'sunshine_duration', label: 'Sunshine Duration in hours'},
        {name: 'Precipitation', param: 'precipitation_sum', label: 'Precipitation in mm'} 
    ];


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
        button: { marginBottom: '10px', borderRadius: '8px !important', width: '140px !important', fontFamily: 'Baloo !important', fontSize: '16px' }
    }


    useEffect(() => {
        fetchDate(dateLength);
        setCityName(WeatherService.cityName);        
    }, [labelLengthName, chartParameter]);  
    

    // console.log = console.warn = console.error = () => {};
    

    const fetchDate = (length) => {
        if (labelLengthName !== 'choosen period') {
            let start = new Date();
            start.setDate(start.getDate() - length);
    
            let end = new Date();
            end.setDate(end.getDate() - 2);
            
            fetchAPIData(dateFormat(start), dateFormat(end), chartParameter);
        } else { fetchAPIData(startDate, endDate, chartParameter) }
       
    }

    
    const fetchAPIData = async (start, end, parameter) => {        
        const todayWeather = await WeatherService.fetchHistoryWeather(start, end, parameter);
        
        if (todayWeather === 'No coordinates') {
            navigate('/track');
        } else {    
            setWeatherData(todayWeather);
            setIsLoading(true);
        }
    }


    const dateFormat = (date) => {
        const d = new Date(date);
        let currdateFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        return currdateFormat;
    }


    const fetchNewChart = () => {
        setShowDatepicker(false);
        fetchAPIData(startDate, endDate, chartParameter);
        setLabelLengthName('choosen period');
    }


    const handleCloseDialog = () => {
        setShowDatepicker(false);
    };


    const getLabelName = () => {
      return labelLengthName;
    }


    const getChartParameterData = (index: SetStateAction<number>, param, label) => {
        setSelectedIndex(index);
        setChartParameter(param); 
        setChartLabelName(label);
    }

    
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
            </div>

            <div className="chartParameterNav">
                {Array.from(Array(4).keys()).map((index) => (
                        <Button key={"chartbtn"+index} style={{ backgroundColor: index === selectedIndex ? '#00adb5' : '#9c27b0'}}
                            variant="contained" color="secondary" sx={sxStyle.button}
                                onClick={() => {getChartParameterData(index, chartParameterBtns[index].param, chartParameterBtns[index].label)}}>
                                    {chartParameterBtns[index].name}
                        </Button>
                ))} 
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

                                    <HistoryDatepicker setStartDate={setStartDate} setEndDate={setEndDate} 
                                        dateFormat={dateFormat} startDate={startDate} endDate={endDate} />

                                    <Button variant="contained" color="secondary" onClick={fetchNewChart} 
                                        disabled={startDate === '' || endDate === ''}>
                                        Search
                                    </Button>
                                </div>
                            </Dialog>
                        </div>
                    }


                    <HistoryLineChart weatherData={weatherData} dateLength={dateLength} chartParameter={chartParameter} chartLabelName={chartLabelName} />

                    <HistoryNavbar setDateLength={setDateLength} setShowDatepicker={setShowDatepicker} 
                        setLabelLengthName={setLabelLengthName} getLabelName={getLabelName} />
                </div>
            ) : <Loader />}
        </div>
    );
};

export default HistoryWeather;