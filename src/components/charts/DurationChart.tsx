import { useState, useEffect } from "react";
import Loader from '../../UI/Loader';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);


const DurationChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(false)
        options.series[0].data = [];
        options.series[1].data = [];
        options.xAxis.categories = [];
        for (let i = 0; i < props.weatherData.time.length; i++) {
            options.series[0].data.push(Math.floor(props.weatherData.daylight_duration[i] / 3600));
            options.series[1].data.push(Math.floor(props.weatherData.sunshine_duration[i] / 3600));
            options.xAxis.categories.push(props.weatherData.time[i]);
        }
        setChartData(options.series[0].data);

        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    }, [props]); 


    const [options] = useState({
        chart: {
            type: 'column'
        },

        title: '',
    
        xAxis: {
            categories: []
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Duration in hours'
            }
        },
    
        tooltip: {
            format: '{key}<br/>{series.name}: {y} h<br/>'
        },
    
        series: [{
            name: 'Daylight',
            data: [],
            color: 'rgb(201, 32, 26)'
        }, {
            name: 'Sunshine',
            data: [],
            color: 'yellow'
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

export default DurationChart;