const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 17, __v: 0 }, 
{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]
beforeAll(async () => {
    await Blog.deleteMany({},() => {
        console.log()
    });
    jest.setTimeout(30000)
})

beforeEach(async () => {
    jest.setTimeout(30000)
    await Blog.deleteMany({},() => {
        console.log(Blog)
    });

    // const blogObjects = blogs.map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray);   executes in no particular order
    for(let blog of blogs) // when you have a particular order to follow
     {
         let blogObject = new Blog(blog)
         await blogObject.save()
     }
})

describe('to check for basic operations', () => {
test('all blogs are returned',async () => {
    const response = await api.get('/api/blog')
    expect(response.body).toHaveLength(blogs.length)

})

test('test to check bad request',async () => {
    const newBlog = { _id: "5a422bc61b54a676234d17f0", author: "Robert C. Martin King", __v: 0 }
    await api.post('/api/blog')
             .send(newBlog)
             .expect(400)
})

test('test to check if api returns json',async () => {
    await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('test to check post operation',async () => {
    const newBlog = {  title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
    await api.post('/api/blog')
            .send(newBlog)
            .expect(201)
    const blogsLength = await Blog.countDocuments((err,count) => {

    });
    expect(blogsLength).toBe(blogs.length + 1)
})
})

describe('to check for values', () => {
test('test to check for property id',async () => {
    const response = await api.get('/api/blog')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('test to check default value for likes',async () => {
    const newBlog = { title: "Type wars", author: "Robert C. Martin King", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", __v: 0 }
    const response = await api.post('/api/blog')
             .send(newBlog)
             .expect(201)
    expect(response.body.likes).toBe(0)
})

})

describe('to check with id',() => {
    test('to delete a blog using id',async () => {
    await api.delete('/api/blog/5a422a851b54a676234d17f7')
           .expect(204)
    const count = await Blog.countDocuments({})
    expect(count).toBe(5)
    const result = await Blog.findById('5a422a851b54a676234d17f7')
    expect(result).toHaveLength(0)
    })

    test('to update a blog using id',async () => {
        await api.put('/api/blog/5a422a851b54a676234d17f7')
                .send({likes:7})
        const result = await Blog.findById('5a422a851b54a676234d17f7')
        expect(result[0].likes).toBe(7)
    })
})


afterAll(() => {
    await Blog.deleteMany({},() => {
        console.log("DELETED")
    })
    mongoose.connection.close()
  })