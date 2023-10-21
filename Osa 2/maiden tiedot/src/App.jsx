import { useState, useEffect } from 'react'
import Search from "./components/Search"
import Results from "./components/Results"
import coutrtriesService from "./services/countries"
import weatherService from "./services/weather"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState(null)
  const [info, setInfo] = useState(null)
  const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter))

  // Effect to initialize countries data when the component is first rendered
  useEffect(() => {
    if (countries.length == 0) {
      console.log("initialize all contries")
      coutrtriesService.getCountries().then(countriesFromApi => {
        const newCountries = countriesFromApi.map(country => country.name.common)
        setCountries(newCountries)
      })
    }
  }, [])

  // Effect to fetch individual country info when the filter text changes
  useEffect(() => {
    console.log("info fetch")
    if (filteredCountries.length === 1) {
      console.log("info if")
      coutrtriesService.getInfo(filteredCountries[0]).then(infoFromApi => {
        const wantedInfo = {
          "name": infoFromApi.name.common,
          "capital": infoFromApi.capital[0],
          "area": infoFromApi.area,
          "languages": Object.values(infoFromApi.languages),
          "flag": infoFromApi.flag,
          "latlng": infoFromApi.latlng,
        }

        weatherService.getWeather(wantedInfo.latlng).then(weatherFromApi => {
          wantedInfo.weather = {
            "temp": weatherFromApi.main.temp,
            "description": weatherFromApi.weather[0].description,
            "wind": weatherFromApi.wind.speed,
            "icon": weatherFromApi.weather[0].icon
          }
          console.log(`wanted info from api: ${JSON.stringify(wantedInfo)}`)
          setInfo(wantedInfo)
        })
      })
    }
  }, [filter])

  // Event handler for filtering countries based on user input
  const handelFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    //console.log(`filter chnaged. Now ${event.target.value}`)
  }

  // Event handler for selectiong country from list
  const changeToSingleCountry = (country) => {
    setFilter(country.toLowerCase())
    console.log(`Changing to single country using filter. Filter chnaged to ${country}.`)
  }

  // Render the search input and results component with filtered and selected country info
  return (
    <div>
      <Search onChange={handelFilterChange} filter={filter} />
      <Results 
        countries={countries} 
        matches={filteredCountries} 
        info={info} 
        buttonClick={changeToSingleCountry} 
      />
    </div>
  )
}

export default App
