const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getJWT = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user')
    response.send(result.map(u => u.toJSON()))
  })
  
blogsRouter.post('/', async (request, response) => {
    //const token = getJWT(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({...request.body,user:user._id})
    if(!blog.title && !blog.url)
      response.status(400).end()
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  })

  blogsRouter.delete('/:id',async (request,response,next) => {
  try {
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === decodedToken.id)
    {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    return response.status(403).send({error:"not an authorized user"})
  }
  catch(exception)
  {
    next(exception)
  }
  })

  blogsRouter.put('/:id',async (request,response,next) => {
    const blog = {
      likes : request.body.likes
    }
    try {
      const result = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
      console.log(result)
      response.json(result.toJSON())
    }
    catch(exception){
      next(exception)
    }
  })

module.exports = blogsRouter