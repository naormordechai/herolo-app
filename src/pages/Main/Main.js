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



const styles = {
    containerAutoComplete: {
        margin: '150px auto 0 auto',
        width: '600px'
    }
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
    }

    const recognizeIfFavorite = (city) => {
        // props.favorites.find()
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

    const handleAddFavorite = () => {
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
        <div className={classes}>
            <AutoComplete
                handleCurrenctWeather={onHandleCurrenctWeather}
                handleDailyForecasts={onHandleDailyForecasts}
                handleCurrentLocation={onHandleCurrentLocation} />
            {currenctWeather ?
                <div>
                    <CurrenctWeather weather={currenctWeather} location={currenctLocation} />
                    <button onClick={handleAddFavorite}>
                        {isFavorite ? 'remove from my list' : 'add to my list'}
                    </button>
                </div> : null
            }
            <DailyForecast dailyForecasts={dailyForecasts} />
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