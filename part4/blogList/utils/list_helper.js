const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum,item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    let maxItem = {likes:-1}
    blogs.forEach(element => {
        if(maxItem.likes && element.likes > maxItem.likes)
        {
            maxItem = {...element}
        }
    })
    return maxItem
}

const mostBlogs = (blogs) => {
    let maxBlogs = {}
    blogs.forEach(element => {
        maxBlogs[element.author] = maxBlogs[element.author] !== undefined ? maxBlogs[element.author] += 1 : 1
    })
    const result = Object.entries(maxBlogs).reduce((a,b) => a[1] > b[1] ? a : b)
    return {author : result[0],blogs : result[1]}
}

const mostLikes = (blogs) => {
    let maxLikes = {}
    blogs.forEach(element => {
        maxLikes[element.author] = maxLikes[element.author] !== undefined ? 
            maxLikes[element.author] += element.likes : element.likes
    })
    const result = Object.entries(maxLikes).reduce((a,b) => a[1] > b[1] ? a : b )
    return {author : result[0],likes : result[1]}
}

mostLikes([ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
])

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}