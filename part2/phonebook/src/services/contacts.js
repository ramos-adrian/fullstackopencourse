import axios from "axios";
import {logDOM} from "@testing-library/react";

const baseUrl = 'http://localhost:3001/persons'
const getContacts = () => axios.get(baseUrl).then( r => r.data)

const addContact = contact => axios.post(baseUrl, contact).then( r => r.data )

const deleteContact = id => axios.delete(`${baseUrl}/${id}`).then(r => r.status)

const updateContact = updatedContact => axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact).then(r => r.data)

export default {getContacts, addContact, deleteContact, updateContact}
