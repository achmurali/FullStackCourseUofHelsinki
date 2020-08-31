import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from  'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()
        
    const onSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        props.createAnecdote(content)
        setTimeout(() => props.removeBanner(),5000)
    }

    return (
        <form onSubmit= {onSubmit}>
        <div><input name = "content"/></div>
        <button type="submit">create</button>
      </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAnecdote : (content) => {
            dispatch(createAnecdote(content))
        },
        removeBanner : () => {
            dispatch({type:'REMOVE_BANNER'},5000)
        }
    }
}

const ConnectedForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm