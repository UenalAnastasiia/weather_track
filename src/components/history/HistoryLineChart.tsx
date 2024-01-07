import { CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useState, useEffect } from "react";


const HistoryLineChart = (props) => {
    const [chartData, setChartData] = useState(props.weatherData.daily.temperature_2m_mean);
    const [timeData, setTimeData] = useState(props.weatherData.daily.time);
    const [isLoading, setIsLoading] = useState(false);

    const sxStyle = {
        lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important', fontFamily: 'Baloo !important' } }
    }

    useEffect(() => {
        console.log(props);
        
        // setIsLoading(false);
        setTimeData(props.weatherData.daily.time);
        setChartData(props.weatherData.daily[props.chartParameter]);
        if (chartData !== undefined) {
            setIsLoading(true);
        }


        // setTimeout(() => {
        //     setChartData(props.weatherData.daily[props.chartParameter]);
        //     if (chartData !== undefined) {
        //         setIsLoading(true);
        //     }
        // }, 2000);

    }, [props]);  


    return (
        <div className="historyChart">
            {isLoading ? (
                <div>
                    {chartData && (
                        <LineChart sx={sxStyle.lineChart} width={1000} height={500}
                            series={[
                                { data: chartData, 
                                  label: props.chartLabelName,
                                  color: '#a41313' 
                                }]}

                                xAxis={[{ scaleType: 'point', data: timeData }]}
                                slotProps={{ legend: { labelStyle: { fill: 'white', fontFamily: 'Baloo !important' } }}}
                        />
                    )}
                </div>
                
            ) : <CircularProgress />} 
            
        </div>
    );
};

export default HistoryLineChart;