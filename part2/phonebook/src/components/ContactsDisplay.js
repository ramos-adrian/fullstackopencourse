const PersonDisplay = ({person}) => <div>{person.name} {person.number}</div>

const ContactsDisplay = ({persons, onDelete}) => {
    return (<div>
            <ul>
                {persons.map(person =>
                    <li key={person.id}>
                        <PersonDisplay person={person}/>
                        <button onClick={onDelete(person.id)}>Delete</button>
                    </li>)}
            </ul>
        </div>
    )
}
export default ContactsDisplay
