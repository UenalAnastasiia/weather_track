import React from 'react';
import TemperatureChart from '../charts/TemperatureChart';
import DurationChart from '../charts/DurationChart';
import WindChart from '../charts/WindChart';
import PrecipitationChart from '../charts/PrecipitationChart';

const ChartCheck = (props) => {    
    return (
        <div>
            {props.chartLabelName === 'Temperature in °C' && 
                <TemperatureChart weatherData={props.weatherData} dateLength={props.dateLength} chartLabelName={props.chartLabelName} />}

                    {props.chartLabelName === 'Duration in hours' && 
                        <DurationChart weatherData={props.weatherData} dateLength={props.dateLength} chartLabelName={props.chartLabelName} />}

                    {props.chartLabelName === 'Wind Speed in km/h' && 
                        <WindChart weatherData={props.weatherData} dateLength={props.dateLength} chartLabelName={props.chartLabelName} />}

                    {props.chartLabelName === 'Precipitation in mm' && 
                        <PrecipitationChart weatherData={props.weatherData} dateLength={props.dateLength} chartLabelName={props.chartLabelName} />}
        </div>
    );
};

export default ChartCheck;