import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './auto-complete.css';
import axios from 'axios';
import weatherService from '../../services/weatherService';



// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getSuggestions = async (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx&q=${value}`);
    return data.filter(city => regex.test(city.LocalizedName));
}

const getSuggestionValue = (suggestion) => {
    return suggestion.LocalizedName;
}

const renderSuggestion = (suggestion) => {
    return (
        <span>{suggestion.LocalizedName}</span>
    );
}

const AutoComplete = (props) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event, { newValue, method }) => {
        setValue(newValue)
    };

    const onSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = await getSuggestions(value);
        setSuggestions(suggestions)
    };


    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const onSuggestionSelected = async (e, data) => {
        const resCurrentWeather = await weatherService.getCurrentWeather(data.suggestion.Key);
        const resDailyForecast = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.suggestion.Key}?apikey=Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx`)
        props.handleCurrenctWeather(resCurrentWeather.data[0].Temperature);
        props.handleDailyForecasts(resDailyForecast.data.DailyForecasts);
        props.handleCurrentLocation(data.suggestion);
    }

    const inputProps = {
        placeholder: "city name",
        value,
        onChange
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={inputProps} />
    );
}

export default AutoComplete;
