import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginService from './services/login'
import Togglable from './components/Togglable';
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [error,setError] = useState(null)

  const blogsFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')
    if(loggedUser)
    {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await LoginService.login({
        username,password
      })
      window.localStorage.setItem('blogListUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception)
    {
      setError('Wrong Credentials')
      setTimeout(() => {
        setError(null)
      },5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  const createBlog = (result) => {
    if(result)
    {
      console.log(result)
      let newBlogs = [...blogs]
      newBlogs = newBlogs.concat([result])
      setBlogs(newBlogs)
      setError(`${result.user.name} is successfully created`)
    }
    else
      setError('Failed creating a user')
    setTimeout(() => {
      setError(null)
    },5000)
  }

  const loginForm = () => (
      <LoginForm handleLogin = {handleLogin} username = {username} 
      password = {password} 
      setPassword = {setPassword}
      setUsername = {setUsername}
      />
  )

  const blogsForm = () => {
    return (
    <Togglable buttonLabel = 'create new' ref = {blogsFormRef}>
      <BlogsForm createBlog = {createBlog} blogService = {blogService}/>
    </Togglable>
    )
  }

  return (
    <>
    <h3>{error}</h3>
      {
      user === null ? loginForm() :
      (
        <div>
        <br/>
        <strong>{user.name} is logged in</strong>
        <button onClick = {handleLogout}>Logout</button>
        {blogsForm()}
        <h2>blogs</h2>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      )
      }
    </>
  )
}

export default App