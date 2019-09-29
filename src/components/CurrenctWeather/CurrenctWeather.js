import React from 'react';
import injectSheet from 'react-jss';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

const CurrenctWeather = props => {
    const { weather, location, isFavorite, handleAddFavorite, classes } = props;
    return (
        // <div>
        //     {/* <div>{location}</div> */}
        //     <div>Unit:{weather.Imperial.Unit} - {weather.Imperial.Value}</div>
        //     <div>Unit:{weather.Metric.Unit} - {weather.Metric.Value}</div>
        // </div>
        <div className={classes.container}>
            <div>
                <div>Tel Aviv</div>
                <div>38 c</div>
            </div>
            <button onClick={handleAddFavorite}>
                {isFavorite ? 'remove from my list' : 'add to my list'}
            </button>
        </div>
    );
};

export default injectSheet(styles)(CurrenctWeather);