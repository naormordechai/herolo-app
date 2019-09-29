import axios from 'axios';
const API_KEY = 'Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx';

const getCurrentWeather = async (key) => {
    return await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`);
}

const getDailyForecasts = async (key) => {
    return await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
}

const getCities = async (value) => {
    return await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`);
}

export default {
    getCurrentWeather,
    getDailyForecasts,
    getCities
}
