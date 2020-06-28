import React, { useState } from 'react'

const BlogsForm =  ({createBlog,blogService}) => {
    const  [url,setUrl] = useState('')
    const  [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blog = {
          url:url,
          title:title,
          author:author
        }
        try{
          const result = await blogService.create(blog)
          createBlog(result)
          setUrl('')
          setAuthor('')
          setTitle('')
        }
        catch(exception)
        { 
          createBlog()
        }
      }

    return (
            <div>
            <h4>Create a Blog</h4>
            <form onSubmit = {handleSubmit}>
            <div>
            title:
            <input type = "text" name = "title" value = {title} onChange = { ({target}) => setTitle(target.value)} className = 'title'/>
            </div>
            <div>
            author:
            <input type = "text" name = "author" value = {author} onChange = { ({target}) => {setAuthor(target.value)}}/>
            </div>
            <div>
            url:
            <input type = "text" name = "url" value = {url} onChange = { ({target}) => setUrl(target.value)}/>
            </div>
            <button type = "submit" className = 'submit'>Create</button>
            </form>
        </div>
    )
}

export default BlogsForm