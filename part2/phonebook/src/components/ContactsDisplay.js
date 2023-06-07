const PersonDisplay = ({person}) => <li>{person.name} {person.number}</li>

const ContactsDisplay = ({persons}) => {
    return (<div>
        <ul>
            {persons.map(person => <PersonDisplay key={person.id} person={person}/>)}
        </ul>
    </div>)
}

export default ContactsDisplay
