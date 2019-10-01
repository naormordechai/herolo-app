import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
    favorites: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.concat(action.location)
            }
        case actionTypes.REMOVE_FAVORITE:
            const updatedFavorites = state.favorites.filter(favorite => favorite.Key !== action.location.Key);
            return {
                ...state,
                favorites: updatedFavorites
            }

        default:
            return state;
    }
};

export default reducer;