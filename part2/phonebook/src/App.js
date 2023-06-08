import {useState, useEffect} from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import ContactsDisplay from "./components/ContactsDisplay";
import FeedbackMessage from "./components/FeedbackMessage";

import './index.css'

import contactService from "./services/contacts"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')
    const [feedbackMessage, setfeedbackMessage] = useState({})

    useEffect(() => {
        contactService.getContacts()
            .then(personsResponse => {
                setPersons(personsResponse)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(p => p.name).includes(newName)) {

            const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (!replaceNumber)return

            const updatedContact = {...persons.find(p=>p.name === newName), number:newNumber}
            contactService.updateContact(updatedContact)
                .then(updatedContactResponse => {
                    setPersons(persons.map(p => p.name !== newName ? p : updatedContactResponse))
                })
                .catch( error => {
                    setfeedbackMessage({style: 'errorBlock', message: `${newName} is no longer in the database!`})
                    setPersons(persons.filter(p => p.name !== newName))
                    setTimeout(() => setfeedbackMessage({}), 5000)
                })
            return;
        }
        const newContact = {name: newName, number: newNumber}
        contactService.addContact(newContact).then(contact => {
            setPersons([...persons].concat(contact))
            setfeedbackMessage({style: 'successBlock', message: `${newName} was added to the list!`})
            setTimeout(() => setfeedbackMessage({}), 5000)
        })
    }

    const deletePerson = (id) => () => {
        const nameToDelete = persons.find(p => p.id === id).name
        if (!window.confirm(`Delete ${nameToDelete}?`)) return
        contactService.deleteContact(id)
            .then(status => {
                if (status === 200) {
                    setPersons(persons.filter(p => p.id !== id))
                }
            })
            .catch( error => {
                window.alert(`That person is not in the database`)
                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const handleInputNameChange = (event) => setNewName(event.target.value)
    const handleInputNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilterString(event.target.value)

    const personsToShow = persons.filter(p => p.name.toLowerCase().startsWith(filterString.toLowerCase()))

    return (<div>
        <h1>PhoneBook</h1>
        <FeedbackMessage feedbackMessage={feedbackMessage}/>
        <Filter handleFilterChange={handleFilterChange}/>
        <h2>Add a new Contact</h2>
        <Form handleInputNumberChange={handleInputNumberChange} handleInputNameChange={handleInputNameChange}
              addPerson={addPerson}/>
        <h2>Numbers</h2>
        <ContactsDisplay persons={personsToShow} onDelete={deletePerson}/>
    </div>)
}

export default App;