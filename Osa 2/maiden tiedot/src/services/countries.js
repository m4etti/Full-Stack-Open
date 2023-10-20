import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountries = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}

const getInfo = (country) => {
    return axios.get(`${baseUrl}/name/${country}`).then(response => response.data)
}

export default { getCountries, getInfo }