const Weather = ({ info }) => {
    if (info) {
        return (
            <div>
                <h4>Weather:</h4>
                <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} alt="alternatetext"></img>
                <p>{info.description.charAt(0).toUpperCase() + info.description.slice(1)}</p>
                <p>Temperature {info.temp} &deg;C</p>
                <p>Wind {info.wind}</p>
            </div>
        )
    }
}

export default Weather