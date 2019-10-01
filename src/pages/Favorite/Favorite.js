import React, { useEffect, useState } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from '../../components/UI/Card/Card';
import weatherService from '../../services/weatherService';
import { NavLink } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > a': {
            flex: '1',
            minWidth: '200px',
            margin: '0 20px 20px',
            textDecoration: 'none',
            color: '#000',
        },
    },
    boxFavorite: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '150px',
        flex: '1',
        justifyContent: 'space-evenly',
        '& > div:first-child': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }

    },
    cartStyleFavorite: {
        transtion: '.2s',
        '&:hover': {
            background: 'rgba(0,0,0,.04)'
        }
    }
};

const Favorite = props => {
    const [newFavorites, setNewFavorites] = useState([]);

    const getNewsFavorites = async () => {
        const favorites = Promise.all(props.favorites.map(async (favorite) => {
            const newFavorite = { ...favorite };
            const resCurrentWeather = await weatherService.getCurrentWeather(favorite.Key);
            const weather = resCurrentWeather.data[0];
            newFavorite.weatherText = weather.WeatherText;
            newFavorite.temperature = weather.Temperature;
            return newFavorite;
        }));
        const res = await favorites;
        setNewFavorites(res);
    }

    useEffect(() => {
        getNewsFavorites();
    }, [])

    const { classes } = props;
    return (
        <>
            {newFavorites && newFavorites.length ?
                <div className={classes.container}>
                    {newFavorites.map((favorite => (
                        <NavLink to={{ pathname: '/main', search: `?city=${favorite.LocalizedName}&key=${favorite.Key}` }} key={favorite.Key}>
                            <Card styles={classes.cartStyleFavorite}>
                                <div className={classes.boxFavorite}>
                                    <div>
                                        <div>{favorite.LocalizedName}</div>
                                        {favorite.temperature && favorite.temperature.Metric ?
                                            <div>{favorite.temperature.Metric.Value} {favorite.temperature.Metric.Unit}</div> : null}
                                    </div>
                                    <div>{favorite.weatherText}</div>
                                </div>
                            </Card>
                        </NavLink>
                    )))}
                </div>
                : <div>
                    NO FAVORITES
                </div>
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        favorites: state.favoriteReducer.favorites
    }
}

export default compose(connect(mapStateToProps), injectSheet(styles))(Favorite);