const CountryList = ({ countries, buttonClick}) => {

    return (
        <ul>
            {countries.map(country => (
                <li key={country}>{country} <button onClick={() => buttonClick(country)}>Show</button> </li>
            ))}
        </ul>
    )
}

export default CountryList