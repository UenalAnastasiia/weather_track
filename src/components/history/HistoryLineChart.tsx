import { LineChart } from '@mui/x-charts';
import { useState, useEffect, useMemo } from "react";
import Loader from '../../UI/Loader';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);


const HistoryLineChart = (props) => {
    const [chartData, setChartData] = useState(props.weatherData.daily.temperature_2m_mean);
    const [timeData, setTimeData] = useState(props.weatherData.daily.time);
    const [isLoading, setIsLoading] = useState(true);
    const sxStyle = {
        lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important', fontFamily: 'Baloo !important' } }
    }

    useEffect(() => {
        for (let i = 0; i < props.dateLength; i++) {
            options.series[0].data.push([(Date.parse(props.weatherData.daily.time[i])), props.weatherData.daily.temperature_2m_min[i], 
                props.weatherData.daily.temperature_2m_max[i]])
        }

        setChartData(options.series[0].data);
        // if ((props.chartParameter === 'daylight_duration' && props.weatherData.daily[props.chartParameter]) || 
        //     (props.chartParameter === 'sunshine_duration' && props.weatherData.daily[props.chartParameter])) {
        //     let newData = props.weatherData.daily[props.chartParameter].map((element) => Math.floor(element / 3600));
        //     setChartData(newData);
        // } else if (props.chartParameter === 'temperature_2m_max,temperature_2m_min' && props.weatherData.daily) {
        //     for (let i = 0; i < props.dateLength; i++) {
        //         options.series[0].data.push([(Date.parse(props.weatherData.daily.time[i])), props.weatherData.daily.temperature_2m_min[i], props.weatherData.daily.temperature_2m_max[i]])
        //     }
        //     console.log(options.series[0].data);
        //     setChartData(options.series[0].data);
        // } else { setChartData(props.weatherData.daily[props.chartParameter]); }

        // setTimeData(props.weatherData.daily.time);

        if (chartData !== undefined) {
            setIsLoading(true);
        } 
    }, [props]); 
    

    const [options] = useState({
        chart: {
            type: 'arearange',
            zoomType: 'x',
            scrollablePlotArea: {
                // minWidth: 600,
                scrollPositionX: 1
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            accessibility: {
                rangeDescription: 'Range'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°C',
            xDateFormat: '%A, %b %e'
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


    // useMemo(() => {
    //     for (let i = 0; i < props.dateLength; i++) {
    //         options.series[0].data.push([(Date.parse(props.weatherData.daily.time[i])), props.weatherData.daily.temperature_2m_min[i], 
    //             props.weatherData.daily.temperature_2m_max[i]])
    //     }

    //     setChartData(options.series[0].data);

    //     // if (chartData !== undefined) {
    //     //     setIsLoading(true);
    //     // } 
    // }, [props.dateLength]); 


    return (
        <div className="historyChart">
            {isLoading ? (
                <div>
                    {chartData && (
                        <HighchartsReact highcharts={Highcharts} options={options} />
                        // <LineChart sx={sxStyle.lineChart} width={1000} height={500}
                        //     series={[
                        //         { data: chartData, 
                        //           label: props.chartLabelName,
                        //           color: '#a41313' 
                        //         }]}

                        //         xAxis={[{ scaleType: 'point', data: timeData }]}
                        //         slotProps={{ legend: { labelStyle: { fill: 'white', fontFamily: 'Baloo !important' } }}}
                        // />
                    )}
                </div>
            ) : <Loader />} 
            
        </div>
    );
};

export default HistoryLineChart;