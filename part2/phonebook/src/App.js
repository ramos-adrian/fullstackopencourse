import {useState, useEffect} from "react";
import axios from "axios";
import Form from "./components/Form";
import Filter from "./components/Filter";
import ContactsDisplay from "./components/ContactsDisplay";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    useEffect(() => {
        console.log("Effect")
        axios
            .get('http://localhost:3001/persons')
            .then(r => {
                setPersons(r.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(p => p.name).includes(newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons([...persons].concat({
            id: persons.length + 1, name: newName, number: newNumber
        }))
    }

    const handleInputNameChange = (event) => setNewName(event.target.value)
    const handleInputNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilterString(event.target.value)

    const personsToShow = persons.filter(p => p.name.toLowerCase().startsWith(filterString.toLowerCase()))

    return (<div>
        <h1>PhoneBook</h1>
        <Filter handleFilterChange={handleFilterChange}/>
        <h2>Add a new Contact</h2>
        <Form handleInputNumberChange={handleInputNumberChange} handleInputNameChange={handleInputNameChange}
              addPerson={addPerson}/>
        <h2>Numbers</h2>
        <ContactsDisplay persons={personsToShow}/>
    </div>)
}

export default App;