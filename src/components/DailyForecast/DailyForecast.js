import React from 'react';
import injectSheet from 'react-jss';
import { dayes } from '../../constants/days';
import Card from '../UI/Card/Card';

const styles = {
    container: {
        display: 'flex'
    }
};

const DailyForecast = props => {

    const getCurrentDayTxt = (date) => {
        const numOfDay = new Date(date).getDay();
        return dayes[numOfDay];
    };

    const { dailyForecasts, classes } = props;
    return (
        <div className={classes.container}>
            {dailyForecasts.map(df => (
                <Card>
                    <div>
                        <div>{getCurrentDayTxt(df.Date)}</div>
                        <div>{df.Temperature.Minimum.Value} {df.Temperature.Minimum.Unit}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default injectSheet(styles)(DailyForecast);