import { LineChart } from '@mui/x-charts';
import { useState, useEffect } from "react";
import Loader from '../../UI/Loader';


const HistoryLineChart = (props) => {
    const [chartData, setChartData] = useState(props.weatherData.daily.temperature_2m_mean);
    const [timeData, setTimeData] = useState(props.weatherData.daily.time);
    const [isLoading, setIsLoading] = useState(false);

    const sxStyle = {
        lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important', fontFamily: 'Baloo !important' } }
    }

    useEffect(() => {
        if (props.chartParameter === 'daylight_duration' && props.weatherData.daily[props.chartParameter] || 
            props.chartParameter === 'sunshine_duration' && props.weatherData.daily[props.chartParameter]) {
            let newData = props.weatherData.daily[props.chartParameter].map((element) => Math.floor(element / 3600));
            setChartData(newData);
        } else { setChartData(props.weatherData.daily[props.chartParameter]); }

        setTimeData(props.weatherData.daily.time);

        if (chartData !== undefined) {
            setIsLoading(true);
        } 
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
            ) : <Loader />} 
            
        </div>
    );
};

export default HistoryLineChart;