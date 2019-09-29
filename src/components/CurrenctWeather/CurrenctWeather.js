import React from 'react';
import injectSheet from 'react-jss';

const styles = {

};

const CurrenctWeather = props => {
    const { weather, location } = props;
    return (
        <div>
            {/* <div>{location}</div> */}
            <div>Unit:{weather.Imperial.Unit} - {weather.Imperial.Value}</div>
            <div>Unit:{weather.Metric.Unit} - {weather.Metric.Value}</div>
        </div>
    );
};

export default injectSheet(styles)(CurrenctWeather);