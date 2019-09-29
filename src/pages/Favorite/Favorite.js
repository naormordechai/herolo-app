import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from '../../components/UI/Card/Card';
import weatherService from '../../services/weatherService';
import { NavLink } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex'
    },
    boxFavorite: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

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
                <div classes={classes.container}>
                    {favorites.map((favorite => (
                        <NavLink to={{pathname:'/main', search:`?city=${favorite.LocalizedName}&key=${favorite.Key}`}}>
                            <Card>
                                <div className={classes.boxFavorite}>
                                    <div>{favorite.LocalizedName}</div>
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
// export default  injectSheet(styles)(Favorite);