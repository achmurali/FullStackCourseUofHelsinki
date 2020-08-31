import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote,votes:anecdote.votes + 1}
    const response = await anecdoteService.Update(newAnecdote)
    dispatch({
      type:'VOTE',
      data:response,
      content:anecdote.content
    })
  }
}

export const  createAnecdote = (content) => {
  return async dispatch => {
    const id  = getId()
    const data = {content:content,id:id,votes:0}
    const newItem = await anecdoteService.Add(data)
    dispatch({
      type:'ADD',
      id:newItem.id,
      content: newItem.content
    })
  }
}

export const initializeData = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type:'INIT',
        data:anecdotes
      })
    }
}

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type)
  {
    case 'VOTE' : {
      console.log(state)
      const id = action.data.id
      const newAnecdote = action.data
      state = state.map(obj => obj.id !== id ? obj : newAnecdote)
      return state
    }
    case 'ADD' : {
      const newAnecdote = {
        id: action.id,
        content : action.content,
        votes : 0
      }
      return [...state,newAnecdote]
    }
    case 'INIT' : {
      return action.data
    }
    default: return state
  }
}

export default reducer
