const Search = ({ onChange}) => {

    return (
        <div>
            <p>
                Find countries <input onChange={onChange}/>
            </p>
        </div>
        )
}

export default Search