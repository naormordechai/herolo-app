import React from 'react';
import injectSheet from 'react-jss';
import Button from '../UI/Button/Button';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
    },
    boxContent: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    boxIcon: {
        marginRight: '10px'
    }

};

const CurrenctWeather = props => {
    const { weather, location, isFavorite, handleAddFavorite, classes } = props;
    let txtBtn = isFavorite ? 'remove from my list' : 'add to my list';
    return (
        <div className={classes.container}>
            <div className={classes.boxContent}>
                {isFavorite ? <div className={classes.boxIcon}><IoIosCheckmarkCircleOutline /></div> : <div>&nbsp;</div>}
                <div>
                    {location && location.LocalizedName ? <div>{location.LocalizedName}</div> : null}
                    {weather.Temperature && weather.Temperature.Metric && weather.Temperature.Metric.Value ? 
                    <div>{weather.Temperature.Metric.Value} {weather.Temperature.Metric.Unit}</div> : null}
                </div>
            </div>
            <Button clicked={handleAddFavorite}>{txtBtn}</Button>
        </div>
    );
};

export default injectSheet(styles)(CurrenctWeather);