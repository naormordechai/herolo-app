import React, { useState, useEffect, useRef } from 'react';
import injectSheet from 'react-jss';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import CurrenctWeather from '../../components/CurrenctWeather/CurrenctWeather';
import DailyForecast from '../../components/DailyForecast/DailyForecast';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import { DEFAULT_CITY, DEFAULT_KEY_TEL_AVIV } from '../../constants/days';
import weatherService from '../../services/weatherService';
import Card from '../../components/UI/Card/Card';



const styles = {
    container: {
        maxWidth: '1280px',
        margin: '0 auto',
        maxWidth:'80%'
    },
    boxContent: {
        border: '1px solid #c1c1c1',
    },
};

const getSearchParamsObj = (search) => {
    let params = {}
    if (search) {
        var parts = search.substring(1).split('&');

        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
    return params;
}

const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
}

const Main = props => {
    const [currenctWeather, setCurrentWeather] = useState();
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [currenctLocation, setCurrenctLocation] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    // const [number, setNumber] = useState(0);

    useEffect(() => {
        fetchDataInitial()
        setCurrentWeather(12)
    }, [])

    const fetchDataInitial = async () => {
        const searchObj = getSearchParamsObj(props.location.search);
        let res;
        let data;
        if (isEmpty(searchObj)) {
            res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx&q=${DEFAULT_CITY}`);
            data = res.data.find(city => city.Key === DEFAULT_KEY_TEL_AVIV);
        } else {
            res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx&q=${searchObj.city}`)
            data = res.data.find(city => city.Key === searchObj.key);
        }
        const resCurrentWeather = await weatherService.getCurrentWeather(data.Key);
        const resDailyForecast = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.key}?apikey=Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx`)
        onHandleCurrenctWeather(resCurrentWeather.data[0].Temperature);
        onHandleDailyForecasts(resDailyForecast.data.DailyForecasts);
        setCurrenctLocation(data);
        onHandleIfFavorite(data);
    }

    const onHandleIfFavorite = (location) => {
        const favLocation = props.favorites.find(favorite => favorite.Key === location.Key);
        if (favLocation) {
            setIsFavorite(true)
            return true
        } else {
            setIsFavorite(false)
            return false

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
            <Card className={classes.boxContent}>
                {currenctWeather ?
                    <CurrenctWeather
                        weather={currenctWeather}
                        location={currenctLocation}
                        isFavorite={isFavorite}
                        handleAddFavorite={onHandleAddFavorite} />
                    : null
                }
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