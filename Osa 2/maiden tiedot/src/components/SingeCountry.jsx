// import "./SingeCountry.css"

const SingleCountry = ({ info }) => {
    if (info) {
        return (
            <div>
                <h2>{info.name}</h2>
                <p>Capital: {info.capital}</p>
                <p>Area: {info.area}</p>
                <h4>Languages:</h4>
                <ul>
                    {info.languages.map((language => (
                        <li key={language}>{language}</li>)
                    ))}
                </ul>
                <div>
                    <p style={{fontSize: "100px"}}>{info.flag}</p>
                    <p >(windows ei tue lippu emojeita oikein)</p>
                </div>
            </div>
        )
    }
}

export default SingleCountry