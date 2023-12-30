import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const LineChartUI = (chartData) => {
    return (
        <div>
            <LineChart
              width={500}
              height={300}
              series={[
                { data: chartData.maxData, label: chartData.desciption.max, color: '#a41313' },
                { data: chartData.minData, label: chartData.desciption.max,  color: '#0c0cba'}
              ]}
              xAxis={[{ scaleType: 'point', data: chartData.xLabels }]}
              slotProps={{
                legend: {
                  labelStyle: {
                    fill: 'white',
                  },
                },
            }}/>
        </div>
    );
};

export default LineChartUI;