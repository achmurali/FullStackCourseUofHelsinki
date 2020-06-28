import React, { useState, useEffect } from 'react'
import Togglable from './Togglable';
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes,setLikes] = useState(0);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    setLikes(blog.likes)
  },[blog])

  const handleLike = async () =>  {
    const result = await blogService.update({likes:likes+1},blog.id)
    console.log(result)
    setLikes(likes+1)
  }

  const handleDelete = async () => {
    const result = await blogService.deleteBlog(blog.id)
  }

  return (
  <div style = {blogStyle} className = 'blog'>
  <Togglable buttonLabel = 'show' defaultDisplay = {blog.title} hideButtonLabel = 'hide'>
    <label>title:</label>{blog.title}<br/>
    <label>url:</label>{blog.url}<br/>
    <label>likes:</label>{likes} <button onClick = {handleLike}>Like</button><br/>
    <label>Author:</label>{blog.user ? blog.user.name : ""}<br/>
    <button onClick = {handleDelete}>Delete</button><br/>
  </Togglable>
  </div>
  )
}

export default Blog


  // <div>
  //   {blog.title} {blog.author}
  // </div>