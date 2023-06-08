import axios from "axios";

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const getCountries = () => axios.get(url).then( result => result.data )

export default { getCountries }