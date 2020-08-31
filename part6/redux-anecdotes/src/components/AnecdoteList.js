import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { connect } from 'react-redux'
import {castVote} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    let id
    const anecdotes = props.anecdotes//useSelector(state => state.anecdotes)
    const filter = props.filter//useSelector(state => state.filter)
    //const dispatch = useDispatch()

    const vote = (anecdote) => {
        props.castVote(anecdote)
        clearTimeout(id)
        id = setTimeout(() => props.removeBanner(),5000)
    }

    return (
        anecdotes.filter((obj) => obj.content.includes(filter)).sort((a,b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )
    )
}

const mapStateToProps =  (state) =>  {
    return {
        filter: state.filter,
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    castVote : (value) => {
        dispatch(castVote(value))},
    removeBanner : () => {
        dispatch({type:'REMOVE_BANNER'},5000)
    }
}
}
 
const ConnectedList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedList