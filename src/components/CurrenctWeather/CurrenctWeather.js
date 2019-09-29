import React from 'react';
import injectSheet from 'react-jss';
import Button from '../UI/Button/Button';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
    }
};

const CurrenctWeather = props => {
    const { weather, location, isFavorite, handleAddFavorite, classes } = props;
    let txtBtn = isFavorite ? 'remove from my list' : 'add to my list';
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
            <Button clicked={handleAddFavorite}>{txtBtn}</Button>
        </div>
    );
};

export default injectSheet(styles)(CurrenctWeather);