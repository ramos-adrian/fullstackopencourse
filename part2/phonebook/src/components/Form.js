const Form = ({addPerson, handleInputNameChange, handleInputNumberChange}) =>
    <form onSubmit={addPerson}>
        <div>
            Name: <input onChange={handleInputNameChange}/>
        </div>
        <div>
            Number: <input onChange={handleInputNumberChange}/>
        </div>
        <div>
            <button type='submit'>Add</button>
        </div>
    </form>

export default Form