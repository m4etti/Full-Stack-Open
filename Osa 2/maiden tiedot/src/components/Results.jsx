import CountryList from "./CountryList"
import SingleCountry from "./SingeCountry"

const Results = ({ matches, info, buttonClick }) => {
    if (matches.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
    else if (matches.length == 1){
        return (
            <div>
                <SingleCountry info={info}/>
            </div>
        )
    }
    else {
        return (
            <div>
                <CountryList countries={matches} buttonClick={buttonClick} />
            </div>
        )
    }
}

export default Results
