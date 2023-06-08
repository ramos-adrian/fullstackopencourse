import { useState, useEffect} from "react";
import countriesService from './services/countries'

const DisplayCountryInfo = ({country}) => {
    const name = country.name['official']
    const capital = country['capital'][0]
    const area = country.area
    const languages = Object.entries(country['languages'])
    const flagUrl = country.flags['png']
    return <div>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}m2</p>
        <p>Languages:</p>
        <ul>
            {languages.map( ([key, value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={flagUrl} alt={`${name} flag`}/>
    </div>
}
const DisplayResult = ({countries, showCountryInfoButton}) => {
    if (countries.length === 0) return <p>Country not found. Type the name of a country</p>
    if (countries.length >= 10) return <p>Too many results, please specify another filter</p>
    if (countries.length === 1) return <DisplayCountryInfo country={countries[0]}/>
    return <ul>
        {countries.map( c => <li key={c.name['common']}>{c.name['common']} <button onClick={showCountryInfoButton(c.name['common'])}>Show</button></li>)}
    </ul>
}

function App() {
    const [countries, setCountries] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    let countriesToShow = []

    useEffect( () => {
        console.log("Loading counties...")
        countriesService.getCountries()
            .then( r => {
            console.log("Countries loaded!")
            setCountries(r)
        } )
    }, [])

    const handleNameFilterChange = (event) => {
        const newName = event.target.value
        setNameFilter(newName.toLowerCase())
    }

    const showCountryInfoButtonHandler = (name) => () => setNameFilter(name.toLowerCase())

    if (countries.length === 0) return <p>Loading countries, please wait...</p>

    countriesToShow = countries.filter(
        ({name}) => name['common'].toLowerCase().startsWith(nameFilter) || name['official'].toLowerCase().startsWith(nameFilter)
    )

    return (
        <div>
            <div>Find countries: <input onChange={handleNameFilterChange}/></div>
            <DisplayResult countries={countriesToShow} showCountryInfoButton={showCountryInfoButtonHandler}/>
        </div>
    )
}

export default App;
