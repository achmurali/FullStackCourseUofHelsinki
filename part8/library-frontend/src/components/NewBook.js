import React, { useState } from 'react'
import {gql,useMutation} from '@apollo/client'
import {ALL_BOOKS} from './Books'
import {ALL_AUTHORS} from './Authors'

const ADD_BOOK = gql`
mutation createBook($title:String!,$published:Int!,$author:String!,$genres:[String]!)
{
  addBook(
    title:$title,
    published:$published,
    author:$author,
    genres:$genres
  ){
    title,
    author{
      name
    }
  }
}
`

const NewBook = (props) => {
  const [addBook,result] = useMutation(ADD_BOOK)

  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    //console.log('add book...')
    //addGenre()
    addBook({variables:{title,published:parseInt(published),genres,author},
    refetchQueries:[{query:ALL_BOOKS},{query:ALL_AUTHORS}]
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook