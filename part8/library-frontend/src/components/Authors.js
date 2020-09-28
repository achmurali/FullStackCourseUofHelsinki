import React, { useState, useEffect } from 'react'
import  { gql,useQuery,useMutation } from '@apollo/client'

export const ALL_AUTHORS = gql`
query{
  allAuthors{
    name
    born
    bookCount
  }
}
`

const EDIT_YEAR  = gql`
mutation editYear($author:String!,$year:Int!)
{
  editAuthor(
    name:$author,
    setBornTo:$year
  ){
    name,
    born,
    bookCount
  }
}
`

const Authors = (props) => {
  console.log("assa")
  const result = useQuery(ALL_AUTHORS)
  const [authors,setAuthors] = useState([])
  const  [editYear,resultMutation] = useMutation(EDIT_YEAR,{
    refetchQueries:[{query:ALL_AUTHORS}]
  })

  const [author,setAuthor] = useState('')
  const [year,setYear] = useState('')

  useEffect(() => {
    if(result.data)
      setAuthors(result.data.allAuthors)
  },[result])

  const onSubmit = (event) => {
    event.preventDefault()
    editYear({variables:{author:author,year:parseInt(year)}})
  }

  if (!props.show) {
    return null
  }

  if(result.loading)
    return <div>loading....</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set Birth Year</h3>
      <form onSubmit={onSubmit}>
      {/* Name:<input type="text"  value={author} onChange={({target}) => setAuthor(target.value)} /> */}
      Select Author:
      <select value={author} onChange={({target})=> setAuthor(target.value)}>
          {authors.map(author_ => <option value={author_.name} key={author_.name}>{author_.name}</option>)}
      </select>
      Born:<input type="number" value={year} onChange={({target})  =>  setYear(target.value)} />
      <button type="submit">Update Author</button>
      </form>

    </div>
  )
}

export default Authors
