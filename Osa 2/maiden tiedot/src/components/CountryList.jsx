const CountryList = ({ countries }) => {

    return (
        <ul>
            {countries.map(country => (
                <li key={country}>{country}</li>
            ))}
        </ul>
    )
}

export default CountryList