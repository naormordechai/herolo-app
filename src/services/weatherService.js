import axios from 'axios';
const API_KEY = 'Y6o0cgIv7K2j6AdfJZLxeGVlRAAAnRrx';

const getCurrentWeather = async (key) => {
    return await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`);
}

export default {
    getCurrentWeather
}
