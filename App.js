import {config} from './config.js';


window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const API_Key = config.API_KEY;

            // PROXY to prevent CORS 
            const proxy = 'https://cors-anywhere.herokuapp.com';
            // const api = ${proxy}`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}`

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data=> {
                console.log(data);
            })
        })
    }
})