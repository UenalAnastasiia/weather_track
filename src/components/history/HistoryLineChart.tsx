import { LineChart } from '@mui/x-charts';


const HistoryLineChart = (props) => {
    const sxStyle = {
        lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important', fontFamily: 'Baloo !important' } }
    }


    return (
        <div className="historyChart">
            <LineChart sx={sxStyle.lineChart} width={1000} height={500}
                series={[
                    { data: props.weatherData.daily.temperature_2m_mean, 
                      label: 'temperature in ' + props.weatherData.daily_units.temperature_2m_mean + ' for ' + props.labelLengthName, 
                      color: '#a41313' }]}
                xAxis={[{ scaleType: 'point', data: props.weatherData.daily.time }]}
                slotProps={{
                    legend: { labelStyle: { fill: 'white', fontFamily: 'Baloo !important' } },
                }}
            />
        </div>
    );
};

export default HistoryLineChart;