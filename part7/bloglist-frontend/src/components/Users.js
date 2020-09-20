import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {initializeUsers} from '../reducers/usersReducer'
import {Link,Switch,Route} from 'react-router-dom'

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    })

    return (
        <>
        <div>
            <h3>USERS</h3>
            <br/>
            <table>
                <thead>
                <tr>
                    <th>Users</th>
                    <th></th>
                    <th>Blogs Created</th>
                </tr>
                </thead>
                <br/>
                <tbody>
                {users.map(user => (
                    <tr id={user.id}>
                        <td><Link to={`/users/${user.id}`} >{user.name}</Link></td>
                        <td></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Users