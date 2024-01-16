import { useState, useEffect } from "react";
import Loader from '../../UI/Loader';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);


const WindChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(false)
        options.series[0].data = [];
        options.xAxis.categories = [];
        for (let i = 0; i < props.weatherData.time.length; i++) {
            options.series[0].data.push(props.weatherData.wind_speed_10m_max[i]);
            options.xAxis.categories.push(dateFormat(props.weatherData.time[i]));
        }
        setChartData(options.series[0].data);

        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    }, [props]); 


    const dateFormat = (date) => {
        const d = new Date(date);
        let currdateFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        return currdateFormat;
    }


    const [options] = useState({chart: {
        zoomType: 'x'
    },

    title: {
        text: '',
        align: 'left'
    },

    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
    },

    xAxis: {
        categories: []
    },

    yAxis: {
        title: {
            text: 'Speed in km/h'
        }
    },

    tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' km/h',
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'Wind',
        data: []
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

export default WindChart;