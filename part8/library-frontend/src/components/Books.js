import React, { useState, useEffect } from 'react'
import {gql,useQuery} from '@apollo/client'

export const ALL_BOOKS = gql`
query{
  allBooks{
    title
    author{
      name
    }
    genres
    published
  }
}
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books,setBooks] = useState([],() => {
    
  })
  const [genres,setGenres] = useState([])
  const [genreFilter,setGenreFilter] = useState(null)

  useEffect(() => {
    if(result.data)
    {
      setBooks(result.data.allBooks)
      const books_genre = result.data.allBooks
      let genreSet = new Set()
      books_genre.forEach((book) => {
        book.genres.forEach(g =>{
          genreSet.add(g)
        })
      })
      setGenres([...genreSet])
    }
    },[result.data])

  const genreClicked = (name) => {
    setGenreFilter(name)
    let filteredBooks =  [...result.data.allBooks]
    filteredBooks = filteredBooks.filter(b => {
      return b.genres.includes(name)
    })
    setBooks(filteredBooks)
  }

  if (!props.show) {
    return null
  }

  if(result.loading)
    return <div>...loading</div>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => <button onClick={() => genreClicked(g)}>{g}</button>)}
    </div>
  )
}

export default Books