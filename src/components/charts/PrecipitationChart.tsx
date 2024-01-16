import { useState, useEffect } from "react";
import Loader from '../../UI/Loader';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);


const PrecipitationChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(false)
        options.series[0].data = [];
        options.series[1].data = [];
        options.xAxis.categories = [];
        for (let i = 0; i < props.weatherData.time.length; i++) {
            options.series[0].data.push(props.weatherData.precipitation_sum[i]);
            options.series[1].data.push(props.weatherData.rain_sum[i]);
            options.xAxis.categories.push(props.weatherData.time[i]);
        }
        setChartData(options.series[0].data);

        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    }, [props]); 


    const [options] = useState({
        chart: {
            type: 'spline'
        },

        title: '',

        xAxis: {
            categories: []
        },

        yAxis: {
            title: {
                text: 'Precipitation in mm'
            },
            labels: {
                format: '{value}mm'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: ' mm',
        },

        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },

        series: [{
            name: 'Precipitation Sum',
            marker: {
                symbol: 'square'
            },
            data: [],
            color: '#3413D2'
    
        }, {
            name: 'Rain Sum',
            marker: {
                symbol: 'diamond'
            },
            data: [],
            color: '#C91534'
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

export default PrecipitationChart;