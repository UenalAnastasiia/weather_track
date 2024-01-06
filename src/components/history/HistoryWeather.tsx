import "../../styles/History.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WeatherService from "../../API/weatherService";
import { CircularProgress, IconButton, Button, Dialog } from "@mui/material";
import { Close, Info, ArrowBack } from "@mui/icons-material";
import LightTooltip from "../../UI/LightTooltip";
import HistoryNavbar from "./HistoryNavbar";
import HistoryDatepicker from "./HistoryDatepicker";
import HistoryLineChart from "./HistoryLineChart";


const HistoryWeather = () => {
    const [weatherData, setWeatherData] = useState(Object);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState(String);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [dateLength, setDateLength] = useState(14);
    const [labelLengthName, setLabelLengthName] = useState('14 Days');
    const navigate = useNavigate();


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
        infoIcon: { color: 'white', fontSize: 18, position: 'absolute', top: '24px', right: '-24px' }
    }


    useEffect(() => {
        fetchDate(dateLength);
        setCityName(WeatherService.cityName);        
    }, [dateLength, labelLengthName]);  
    

    // console.log = console.warn = console.error = () => {};
    

    const fetchDate = (length) => {
        let start = new Date();
        start.setDate(start.getDate() - length);

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
        setLabelLengthName('choosen period');
    }


    const handleCloseDialog = () => {
        setShowDatepicker(false);
    };


    const getLabelName = () => {
      return labelLengthName;
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

                    <HistoryLineChart weatherData={weatherData} labelLengthName={labelLengthName} />

                    <HistoryNavbar setDateLength={setDateLength} setShowDatepicker={setShowDatepicker} 
                        setLabelLengthName={setLabelLengthName} getLabelName={getLabelName} />
                </div>
            ) : <CircularProgress />}
        </div>
    );
};

export default HistoryWeather;