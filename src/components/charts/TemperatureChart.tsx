import "../../styles/History.css";
import { useState, useEffect } from "react";
import Loader from '../../UI/Loader';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);

const TemperatureChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(false)
        options.series[0].data = [];
        for (let i = 0; i < props.weatherData.time.length; i++) {
            options.series[0].data.push([(Date.parse(props.weatherData.time[i])), props.weatherData.temperature_2m_min[i], props.weatherData.temperature_2m_max[i]])
        }
        setChartData(options.series[0].data);

        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    }, [props]); 


    const [options] = useState({
        chart: {
            type: 'arearange',
            zoomType: 'x',
            scrollablePlotArea: {
                scrollPositionX: 1
            }
        },

        title: '',

        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%Y-%m-%d', this.value);
                }
              }
        },

        yAxis: {
            title: {
                text: 'Temperature in °C'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°C',
            xDateFormat: '%Y-%m-%d'
        },

        legend: {
            enabled: false
        },
        
        series: [{
            name: 'Temperatures',
            data: [],
            color: {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#ff0000'],
                    [1, '#0000ff']
                ]
            }
        }],

        accessibility: {
            enabled: false
        }
    });


    return (
        <div className="historyChart">
            {isLoading ? (
                <div>
                    {chartData && (
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    )}
                </div>
            ) : <Loader />} 
            
        </div>
    );
};

export default TemperatureChart;