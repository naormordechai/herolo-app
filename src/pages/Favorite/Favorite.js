import React from 'react';
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

    const getCurrenctWeather = async (favorite) => {
        const { data } = await weatherService.getCurrentWeather(favorite.Key);
        debugger;
        const weather = data[0].Temperature;
        return (
            <div>
                <div>Unit:{weather.Imperial.Unit} - {weather.Imperial.Value}</div>
                <div>Unit:{weather.Metric.Unit} - {weather.Metric.Value}</div>
            </div>
        )
    }

    const { classes, favorites } = props;
    return (
        <>
            {favorites && favorites.length ?
                <div className={classes.container}>
                    {favorites.map((favorite => (
                        <NavLink to={{ pathname: '/main', search: `?city=${favorite.LocalizedName}&key=${favorite.Key}` }}>
                            <Card styles={classes.cartStyleFavorite}>
                                <div className={classes.boxFavorite}>
                                    <div>
                                        <div>{favorite.LocalizedName}</div>
                                        <div>38c</div>
                                    </div>
                                    <div>Sunny</div>
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