window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const API_Key = 'd1b48272a1eb98ad81a7cf7573787634'

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