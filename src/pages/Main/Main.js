import React, { useState, useEffect, useRef } from 'react';
import injectSheet from 'react-jss';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import CurrenctWeather from '../../components/CurrenctWeather/CurrenctWeather';
import DailyForecast from '../../components/DailyForecast/DailyForecast';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../store/actions/index';
import { DEFAULT_CITY, DEFAULT_KEY_TEL_AVIV } from '../../constants/days';
import weatherService from '../../services/weatherService';
import Card from '../../components/UI/Card/Card';
import { getSearchParamsObj, isEmpty } from '../../shared/utility';



const styles = {
    container: {
        maxWidth: '1280px',
        margin: '0 auto',
        height: 'calc(100vh - 70px)'
    },
    boxContent: {
        minHeight: 'calc(100% - 122px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center'
    }
};


const Main = props => {
    const [currenctWeather, setCurrentWeather] = useState();
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [currenctLocation, setCurrenctLocation] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const defaultCity = DEFAULT_CITY;
    const defaultKey = DEFAULT_KEY_TEL_AVIV;

    useEffect(() => {
        fetchDataInitial()
    }, [])

    const fetchDataInitial = async () => {
        const searchObj = getSearchParamsObj(props.location.search);
        let res;
        let data;
        if (isEmpty(searchObj)) {
            res = await weatherService.getCities(defaultCity)
            data = res.data.find(city => city.Key === defaultKey);
        } else {
            res = await weatherService.getCities(searchObj.city)
            data = res.data.find(city => city.Key === searchObj.key);
        }
        const resCurrentWeather = await weatherService.getCurrentWeather(data.Key);
        const resDailyForecast = await weatherService.getDailyForecasts(data.Key);
        // onHandleCurrenctWeather(resCurrentWeather.data[0].Temperature);
        onHandleCurrenctWeather(resCurrentWeather.data[0]);
        onHandleDailyForecasts(resDailyForecast.data.DailyForecasts);
        onHandleCurrentLocation(data);
        onHandleIfFavorite(data);
    }

    const onHandleIfFavorite = (location) => {
        const favLocation = props.favorites.find(favorite => favorite.Key === location.Key);
        if (favLocation) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }

    const onHandleCurrenctWeather = (weather) => {
        setCurrentWeather(weather)
    };

    const onHandleDailyForecasts = dailyForecasts => {
        setDailyForecasts(dailyForecasts)
    };

    const onHandleCurrentLocation = currentLocation => {
        setCurrenctLocation(currentLocation)
    }

    const onHandleAddFavorite = () => {
        const favLocation = props.favorites.find(favorite => favorite.Key === currenctLocation.Key);
        if (favLocation) {
            props.onRemoveFavorite(favLocation)

        } else {
            props.onAddFavorite(currenctLocation)
        }
        setIsFavorite(favorite => !favorite);
    };

    const { classes } = props;
    return (
        <div className={classes.container}>
            <AutoComplete
                handleCurrenctWeather={onHandleCurrenctWeather}
                handleDailyForecasts={onHandleDailyForecasts}
                handleCurrentLocation={onHandleCurrentLocation}
                handleIfFavorite={onHandleIfFavorite} />
            <Card styles={classes.boxContent}>
                {currenctWeather ?
                    <CurrenctWeather
                        weather={currenctWeather}
                        location={currenctLocation}
                        isFavorite={isFavorite}
                        handleAddFavorite={onHandleAddFavorite} />
                    : null
                }
                {currenctWeather ? <h2 className={classes.title}>{currenctWeather.WeatherText}</h2> : null}
                <DailyForecast dailyForecasts={dailyForecasts} />
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        favorites: state.favoriteReducer.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddFavorite: (location) => dispatch(actions.setFavorite(location)),
        onRemoveFavorite: (location) => dispatch(actions.removeFavorite(location))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    injectSheet(styles))
    (Main)