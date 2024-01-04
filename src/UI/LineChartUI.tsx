import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const LineChartUI = (chartData) => {
    const sxStyle = {
      div: { width: '45vw', maxWidth: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
      lineChart: { line: { stroke: 'white !important' }, text: { fill: 'white !important' } }
    }

    return (
          <div style={sxStyle.div}>
            <LineChart
              sx={sxStyle.lineChart} width={500} height={300}
              series={[
                { data: chartData.maxData, label: chartData.desciption.max, color: '#a41313' },
                { data: chartData.minData, label: chartData.desciption.max,  color: '#0c0cba'}
              ]}
              xAxis={[{ scaleType: 'point', data: chartData.xLabels }]}
              slotProps={{
                legend: { labelStyle: { fill: 'white' }}}}
            />
          </div>
    );
};

export default LineChartUI;