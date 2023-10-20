import { useState, useEffect } from 'react'
import Search from "./components/Search"
import Results from "./components/Results"
import coutrtriesService from "./services/countries"

const App = () => {
  const [countries, setCoutries] = useState([])
  const [filter, setFilter] = useState(null)
  const [info, setInfo] = useState(null)
  const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter))

  // Effect to initialize countries data when the component is first rendered
  useEffect(() => {
    if (countries.length == 0) {
      console.log("initialize all contries")
      coutrtriesService.getCountries().then(countriesFromApi => {
        const newCountries = countriesFromApi.map(country => country.name.common)
        setCoutries(newCountries)
        //console.log(newCountries)
      })
    }
  }, [])

  // Effect to fetch individual country info when the filter text changes
  useEffect(() => {
    if (filteredCountries.length === 1) {
      coutrtriesService.getInfo(filteredCountries[0]).then(infoFromApi => {
        const wantedInfo = {
          "name": infoFromApi.name.common,
          "capital": infoFromApi.capital[0],
          "area": infoFromApi.area,
          "languages": Object.values(infoFromApi.languages),
          "flag": infoFromApi.flag
        }
        console.log(`wanted info from api: ${JSON.stringify(wantedInfo)}`)
        setInfo(wantedInfo)
      })
    }
  }, [filter])

  // Event handler for filtering countries based on user input
  const handelFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    //console.log(`filter chnaged. Now ${event.target.value}`)
  }

  // Render the search input and results component with filtered and selected country info
  return (
    <div>
      <Search onChange={handelFilterChange} />
      <Results countries={countries} matches={filteredCountries} info={info} />
    </div>
  )
}

export default App
