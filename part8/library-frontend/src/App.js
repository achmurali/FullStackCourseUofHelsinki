
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/Login'
import NewBook from './components/NewBook'
import {useApolloClient} from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!localStorage.getItem('login-token'))
    return <LoginForm 
      show={true} setToken = {setToken}/>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {token === null ? <button onClick={() => setPage('login')}>Login</button> : 
                          <button onClick={logout}>Logout</button> }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm 
        show={page === 'login'} setToken = {setToken}/>

      {/* <button onClick = {logout}>logout</button> */}
    </div>
  )
}

export default App