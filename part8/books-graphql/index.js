const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { v1 : uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://fullstack:arsenal123@cluster0-mi6z7.mongodb.net/Library?retryWrites=true&w=majority'

console.log('connectiong to',MONGODB_URI)

mongoose.connect(MONGODB_URI,{ useNewUrlParser:true, useUnifiedTopology:true,
  useFindAndModify:false,useCreateIndex:true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MONGODB',error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    //id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    //id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    //id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    //id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    //id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
      title:String!,
      published:Int!,
      author:Author!,
      id:ID!,
      genres:[String!]!
  }

  type Author {
      name:String!,
      id:ID!,
      born:Int,
      bookCount:Int
  }

  type Query {
      bookCount:Int!
      authorCount:Int!
      allBooks(author: String,genre: String):[Book]
      allAuthors:[Author!]!
  }

  type Token{
    value:String!
  }

  type Mutation {
      addBook(
          title:String!
          author:String! 
          published:Int!
          genres:[String]!
      ):Book,
      editAuthor(
          name:String!,
          setBornTo:Int!
      ):Author,
      createUser(
        username:String!,
        genre:String
      ):String,
      login(
        username:String!
        password:String!
      ):Token
  }
`

const resolvers = {
  Query: {
      bookCount : (root,args,context) => {
        if(!context.currentUser){
          console.log("NOT AUTHENTICATED")
          return 0
        }
        return Book.collection.countDocuments()
      },
      authorCount : () => Author.collection.countDocuments(),
      // allBooks : (root,args) => {
      //     let newFilter = [...books]
      //     if(args.author)
      //       newFilter = books.filter(book => book.author === args.author)
      //     if(args.genre)
      //       newFilter = newFilter.filter(book => book.genres.includes(args.genre))
      //     return newFilter
      //   },
      allBooks: async (root,args) => {
        let result
        //console.log("adadadadad")
        if(!args.author && !args.genre)
        {
          result = await Book.find({}).populate('author')
          //console.log(result)
          return result
        }
        if(args.genres)
          result = await Book.find({genres:{$in:args.genres}}).populate('author')
        else if(args.name)
          result = result.find(book => book.author.name === args.name)
        return result
      },
      allAuthors: () => {
        return Author.find({}).exec()
      }
  },
  Mutation: {
      // addBook: (root,args) => {
      //     let book = {...args,id:uuid()}
      //     books = books.concat(book)
      //     if(!authors.find(author => author.name === book.author))
      //       authors = authors.concat({name:book.author,id:uuid()})
      //     console.log(authors)
      //     return book
      // },
      // editAuthor: (root,args) => {
      //     let authorNew = authors.find(author => author.name == args.name)
      //     authorNew.born = args.setBornTo
      //     authors = authors.map(author => author.name === args.name ? authorNew : author)  
      //     return authorNew
      // }
      addBook: async (root,args) => {
        const author = await Author.findOne({name:args.author})
        if(author)
        { 
          const book = new Book({...args,author:author,id:uuid()})
          await book.save()
          return book.populate('Author')
        }
        return null
      },
      editAuthor:async (root,args) =>  {
        const author = await Author.findOne({name : args.name})
        author.born = args.setBornTo
        await author.save()
        return author
      },
      createUser:async (roots,args) => {
        const user = new User({username:args.username})
        await user.save()
        return user.username
      },
      login:async (roots,args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  },
  Author:{
      // bookCount:(root) => {
      //     return books.reduce((count,book) => { 
      //       if(book.author == root.name)
      //       {
      //           return count + 1
      //       }
      //       return count
      //     },0)
      // }
      bookCount:async (root) => {
        const result = await Book.find({}).populate('author')
        //console.log(JSON.stringify(result))
        let count = 0
        result.forEach(book => {
          //console.log(book)
          console.log("root:",root.name)
          if(root.name === book.author.name)
          {
            console.log("inside")
            count+=1
          }
        })
        console.log("count:",count)
        return count 
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      //console.log(JSON.stringify(currentUser))
      return { currentUser }
    }
  }
})

const InitializeData = async () => {
  await Author.deleteMany({})
  await Book.deleteMany({})

  await Promise.all(authors.map(async author => {
    let newAuthor = new Author({...author})
    await newAuthor.save()
  }))

  await Promise.all(books.map(async book => {
    let bookAuthor = await Author.find({name:book.author}).exec()
    //console.log(bookAuthor)
    let newBook = new Book({...book,author:bookAuthor[0]._id})
    await newBook.save()
  }))
}

InitializeData()
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})