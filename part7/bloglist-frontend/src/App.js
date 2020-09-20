import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Users from './components/Users'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginService from './services/login'
import Togglable from './components/Togglable';
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import {createNotification} from './reducers/notificationReducer'
import { initialzeBlogs,createBlogAction } from './reducers/blogReducer'
import {Switch,Link,Route,useRouteMatch} from 'react-router-dom'
import User from './components/User'

const padding = {
  paddingRight: 5
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  //const [error,setError] = useState(null)
  const dispatch = useDispatch()

  //redux
  const notification = useSelector(state => state.notification)
  const blogRedux = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const matchedUser = match ? users.find(user => match.params.id === user.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  console.log(blogRedux)
  const matchedBlog = matchBlog ? blogRedux.find(blog => blog.id === matchBlog.params.id) : null

  const blogsFormRef = React.createRef()

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )  
    dispatch(initialzeBlogs())
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
      dispatch(createNotification('ADD_NOTIFICATION','Wrong Credentials'))
      // setError('Wrong Credentials')
      // setTimeout(() => {
      //   setError(null)
      // },5000)
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
      // console.log(result)
      // let newBlogs = [...blogs]
      // newBlogs = newBlogs.concat([result])
      // setBlogs(newBlogs)
      //setError(`${result.user.name} is successfully created`)
      dispatch(createBlogAction(result))
      console.log(blogRedux)
      dispatch(createNotification('ADD_NOTIFICATION','blog succesfully created'))
      setBlogs(blogRedux)
    }
    else
      dispatch(createNotification('ADD_NOTIFICATION','Failed creating a blog'))
    //setError('Failed creating a user')
    // setTimeout(() => {
    //   setError(null)
    // },5000)
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
    <div>
      <Link to="/" style={padding}>Home</Link>
      <Link to="/users" style={padding}>Users</Link>
    </div>
    <h3>{notification}</h3>
      {
      user === null ? loginForm() :
      (
        <>
        <strong>{user.name} is logged in</strong>
        <button onClick = {handleLogout}>Logout</button>
        <Switch>
          <Route path="/users/:id">
            <User user={matchedUser}/>
          </Route>
          <Route path="/blogs/:id">
            <Blog blog={matchedBlog} />
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
          <Route path="/">
            <div>
            <br/>
            {blogsForm()}
            <h2>blogs</h2>
            <ul>
            {blogRedux.sort((a,b) => b.likes - a.likes).map(blog =>
              <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
            )}
            </ul>
            </div>
          </Route>
        </Switch>
        </>
      )
      }
    </>
  )
}

export default App