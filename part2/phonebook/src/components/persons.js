import React, { useEffect } from 'react'

const Persons = ({persons,filter,handleDelete}) => {
    
    const handleFilter = () => {
        var list = persons.filter((person) => filter === '' ? true : person.name.toLowerCase().includes(filter))
            .map((person) => <li key = {person.name}>{person.name} : {person.number} <button onClick = {() => handleDelete(person.id)}>DELETE</button></li>)    
        return list;
    }

    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {handleFilter()}
            </ul>
        </>
    )
}

export default Persons;