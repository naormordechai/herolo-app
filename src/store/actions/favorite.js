import * as actionTypes from './actionTypes';

const _setFavorite = location => {
    return {
        type: actionTypes.SET_FAVORITE,
        location
    }
};

export const setFavorite = location => dispatch => {
    dispatch(_setFavorite(location));
};

const _removeFavorite = location => {
    return {
        type: actionTypes.REMOVE_FAVORITE,
        location
    }
};

export const removeFavorite = location => dispatch => {
    dispatch(_removeFavorite(location))
}