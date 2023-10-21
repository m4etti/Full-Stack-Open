import axios from 'axios'

const ApiKey = import.meta.env.VITE_WEATHER_API_KEY
//const ApiKey = `a439de23f180692e4fa7106a8b3a3322`

const getWeather = ([lat, lon]) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`
    return (
        axios.get(url)
            .then(restonse => restonse.data)
    )
}

export default { getWeather }

