import React from 'react';
import injectSheet from 'react-jss';
import { dayes } from '../../constants/days';
import Card from '../UI/Card/Card';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: '0 20px 20px',
            minWidth:'170px'
        }
    },
    boxDailyForecasts: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '150px',
        justifyContent: 'space-evenly',
    },
    cardDailyForecasts: {
        flex: '1',
    }
};

const DailyForecast = props => {

    const getCurrentDayTxt = (date) => {
        const numOfDay = new Date(date).getDay();
        return dayes[numOfDay];
    };

    const { dailyForecasts, classes } = props;
    const x = [
        {
            Date: "2019-09-28T07:00:00+03:00",
            Day: { Icon: 1, IconPhrase: "Sunny", HasPrecipitation: false },
            EpochDate: 1569643200,
            Link: "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            MobileLink: "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            Night: { Icon: 33, IconPhrase: "Clear", HasPrecipitation: false },
            Sources: ["AccuWeather"],
        },
        {
            Date: "2019-09-28T07:00:00+03:00",
            Day: { Icon: 1, IconPhrase: "Sunny", HasPrecipitation: false },
            EpochDate: 1569643200,
            Link: "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            MobileLink: "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            Night: { Icon: 33, IconPhrase: "Clear", HasPrecipitation: false },
            Sources: ["AccuWeather"],
        },
        {
            Date: "2019-09-28T07:00:00+03:00",
            Day: { Icon: 1, IconPhrase: "Sunny", HasPrecipitation: false },
            EpochDate: 1569643200,
            Link: "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            MobileLink: "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            Night: { Icon: 33, IconPhrase: "Clear", HasPrecipitation: false },
            Sources: ["AccuWeather"],
        },
        {
            Date: "2019-09-28T07:00:00+03:00",
            Day: { Icon: 1, IconPhrase: "Sunny", HasPrecipitation: false },
            EpochDate: 1569643200,
            Link: "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            MobileLink: "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            Night: { Icon: 33, IconPhrase: "Clear", HasPrecipitation: false },
            Sources: ["AccuWeather"],
        },
        {
            Date: "2019-09-28T07:00:00+03:00",
            Day: { Icon: 1, IconPhrase: "Sunny", HasPrecipitation: false },
            EpochDate: 1569643200,
            Link: "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            MobileLink: "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us",
            Night: { Icon: 33, IconPhrase: "Clear", HasPrecipitation: false },
            Sources: ["AccuWeather"],
        }
    ]
    return (
        <div className={classes.container}>
            {dailyForecasts.map(df => (
                <Card styles={classes.cardDailyForecasts} key={df.Date}>
                    <div className={classes.boxDailyForecasts}>
                        <div>{getCurrentDayTxt(df.Date)}</div>
                        <div>{df.Temperature.Minimum.Value} {df.Temperature.Minimum.Unit}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default injectSheet(styles)(DailyForecast);