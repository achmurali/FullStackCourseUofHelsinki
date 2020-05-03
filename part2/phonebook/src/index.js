import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import Banner from './components/banner'

import phonebook from './services/phonebook'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ banner,setBanner ] = useState({ message:"DEFAULT MESSAGE",error:false,show:false })
  //const [ flags,setFlags ] = useState({ error:false,show:false })

  useEffect(() => {
    phonebook.getAll()
    .then(persons => 
      setPersons(persons))
  })


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const createBanner = (banner) => {
    setBanner(banner)
    setTimeout(() => {
      setBanner({ message: null,error:false,show:false})
    },5000)
  }

  const handleSubmit = (event) => {
    console.log("Submit")
    event.preventDefault();
    if(persons.some((person) => person.name === newName && person.number === newNumber))
      window.alert(`${newName} is already added to the phone book`);
    else if(persons.some((person) => person.name === newName && person.number !== newNumber))
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new number`))
      {
        const oldPerson = persons.find(person => person.name === newName)
        phonebook.update({...oldPerson,number : newNumber})
          .then(response => {
            createBanner({ message:`${response.name}'s number has been updated`,error:false,show:true})
            setPersons(persons.map(person => person.id === response.id ? response : person))
          })
          .catch(error => {
            createBanner({ message:`${newName} has already been removed from the phone book`,error:true,show:true})
          })
      }
    }
    else
    {
      phonebook
      .create({name:newName,number:newNumber})
      .then(returnedPerson => {
        createBanner({ message:`${returnedPerson.name} has been added to the phonebook`,error:false,show:true})
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        createBanner({ message:`${newName} could not been added to the phone book`,error:true,show:true})
      })
    }
    setNewName('')
    setNewNumber('')
    setFilter('')
  }
    
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  const handleDelete = (id) => {
    if(window.confirm("Do you really want to delete"))
    {
      phonebook.deletePerson(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id))
            console.log(persons)
          })
          .catch(error => {
            createBanner({ message:`${persons.find(person => person.id === id).name} could not be deleted from the phone book`,error:true,show:true})
          })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Banner banner = {banner}/>
      <Filter value = {filter} handleFilter = {handleFilter} />
      <PersonForm newName = {newName} newNumber = {newNumber} 
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} handleSubmit = {handleSubmit} />
      <Persons persons = {persons} filter = {filter} handleDelete = {handleDelete}/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

