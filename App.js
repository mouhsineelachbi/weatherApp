import {config} from './config.js';

let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperature = document.querySelector('.temperature');
let temperatureSpan = document.querySelector('.temperature span');
let iconArray = [
    'CLEAR_DAY', 'CLEAR_NIGHT', 
    'PARTLY_CLOUDY_DAY','PARTLY_CLOUDY_NIGHT',
    'CLOUDY', 'RAIN', 'SLEET','SNOW', 'WIND', 'FOG'
]


window.addEventListener('load', () => 
{
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const API_KEY = config.API_KEY;

            // PROXY to prevent CORS 
            const proxy = 'https://cors-anywhere.herokuapp.com';
            // const api = ${proxy}`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}`

            //const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}&units=metric`
            const api = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${long}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data=> {
                console.log(data);
                //  Set DOM ELements from the API
                const { current, location } = data;
                temperatureDegree.textContent = current.temperature;
                temperatureDescription.textContent = current.weather_descriptions[0];
                locationTimezone.textContent = location.timezone_id;
                // FORMULA FOR CELICIUS
                let Fahrenheit = current.temperature*(5/9) + 32;
                // set Icon
                const icon = data.current.weather_descriptions[0];
                setIcons(icon, document.querySelector('.icon'))

                // change Celicius/Ferenheit
                temperature.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F')
                    {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = current.temperature;
                    }
                    else
                    {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(Fahrenheit);
                    }
                })
            })
        })
    }

    function find(key, array) {
        let results = [];
        for (var i = 0; i < array.length; i++) {
          if (array[i].indexOf(key) == 0) {
            results.push(array[i]);
          }
        }
        return results;
      }

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({ color: 'white'});
        const iconKey = icon.replace(' ', '_').toUpperCase();
        const currentIcon = find(iconKey, iconArray)[0];
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
})