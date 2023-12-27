import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const LineChartUI = (chartData) => {
    return (
        <div>
            <LineChart
              width={500}
              height={300}
              series={[
                { data: chartData.maxData, label: 'Max Degree', color: '#a41313' },
                { data: chartData.minData, label: 'Min Degree',  color: '#0c0cba'}
              ]}
              xAxis={[{ scaleType: 'point', data: chartData.xLabels }]}/>
        </div>
    );
};

export default LineChartUI;