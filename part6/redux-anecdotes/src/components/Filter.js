import React from 'react'
import {useDispatch} from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch({
            type:'FILTER',
            filter:event.target.value
        })
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} name="filter"/>
        </div>
    )
}

export default Filter