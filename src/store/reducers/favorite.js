import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
    favorites: [
        {
            AdministrativeArea: { ID: "I", LocalizedName: "Attica" },
            Country: { ID: "GR", LocalizedName: "Greece" },
            Key: "182536",
            LocalizedName: "Athens",
            Rank: 10,
            Type: "City",
            Version: 1,
        },
        {
            AdministrativeArea: { ID: "I", LocalizedName: "Attica" },
            Country: { ID: "GR", LocalizedName: "Greece" },
            Key: "182536",
            LocalizedName: "Athens",
            Rank: 10,
            Type: "City",
            Version: 1,
        },
        {
            AdministrativeArea: { ID: "I", LocalizedName: "Attica" },
            Country: { ID: "GR", LocalizedName: "Greece" },
            Key: "182536",
            LocalizedName: "Athens",
            Rank: 10,
            Type: "City",
            Version: 1,
        },
        {
            AdministrativeArea: { ID: "I", LocalizedName: "Attica" },
            Country: { ID: "GR", LocalizedName: "Greece" },
            Key: "182536",
            LocalizedName: "Athens",
            Rank: 10,
            Type: "City",
            Version: 1,
        },
        {
            AdministrativeArea: { ID: "I", LocalizedName: "Attica" },
            Country: { ID: "GR", LocalizedName: "Greece" },
            Key: "182536",
            LocalizedName: "Athens",
            Rank: 10,
            Type: "City",
            Version: 1,
        }
    ],
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