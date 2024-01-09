import "../../styles/History.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import WeatherService from "../../API/weatherService";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Loader from "../../UI/Loader";

const DayHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAPIData(new Date());      
    }, []); 
    
    
    const fetchAPIData = async (date) => {  
        let pastData = [];   
        for (let index = 1; index < 21; index++) {
            let result = (date.getFullYear() - index) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            const fetchedData = await WeatherService.fetchDayHistoryWeather(result);
            if (fetchedData === 'No coordinates') {
                navigate('/track');
            } else {    
                pastData.push(fetchedData);           
            }  
        }

        pushDataToChart(pastData);
    }


    const pushDataToChart = (pastData: string | any[]) => {
        for (let i = 0; i < pastData.length; i++) {
            options.xAxis[0].categories.push(pastData[i].daily.time[0]);
            options.series[0].data.push(pastData[i].daily.temperature_2m_mean);
            options.series[1].data.push(pastData[i].daily.precipitation_hours);
            options.series[2].data.push(pastData[i].daily.rain_sum);
        }
        options.title.text = `History for 20 years from ${WeatherService.cityName}`;
        setIsLoading(true);
    }


    const [options] = useState({
        title: {
            text: ''
        },
        xAxis: [{
            categories: [],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} mm',
                style: {
                    color: 'rgb(37 186 105)'
                }
            },
            title: {
                text: 'Rainfall',
                style: {
                    color: 'rgb(37 186 105)'
                }
            },
            opposite: true
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} °C',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Precipitation',
                style: {
                    color: '#c9201a'
                }
            },
            labels: {
                format: '{value} h',
                style: {
                    color: '#c9201a'
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 10,
            verticalAlign: 'bottom',
            y: 20,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255)'
        },
        series: [{
            name: 'Temperature',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: ' °C'
            }
        }, {
            name: 'Precipitation',
            type: 'spline',
            yAxis: 2,
            data: [],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' h'
            },
            color: '#c9201a'
        }, {
            name: 'Rainfall',
            type: 'spline',
            data: [],
            tooltip: {
                valueSuffix: ' mm'
            },
            color: 'rgb(37 186 105)'
        }],
        accessibility: {
            enabled: false
        }
    });
    

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() =>  navigate('/track')} className="dayBackBtn">
                <ArrowBack sx={{color: 'white', fontSize: 24}} />
            </Button>

            <div className='dayHistoryDiv'>
                {isLoading ? (
                    <HighchartsReact highcharts={Highcharts} options={options} />
                ) : <Loader />} 
            </div>
        </div>
    );
};

export default DayHistory;