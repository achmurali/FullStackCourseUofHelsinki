import React, { useEffect } from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import {initializeData} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux';
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeData())
  },[dispatch])

  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App