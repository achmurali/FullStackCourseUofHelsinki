import React, { useState, useEffect } from 'react'
import {gql,useMutation} from '@apollo/client'

const LOGIN = gql`
mutation LOGIN($username:String!,$password:String!)
{
    login(
        username:$username,
        password:$password
    ){
        value
    }
}
`

const LoginForm = (props) => {
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    
    const [Login,result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('login-token',token)
        }
    },[result.data])

    const onSubmit = (event) => {
        event.preventDefault()
        Login({variables:{username,password}})
    } 

    if(!props.show) 
        return null
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
            UserName:
            <input type='text' value={username} onChange={({target}) => setUserName(target.value)}></input>
            Password:
            <input type='password' value={password} onChange={({target}) => setPassword(target.value)}></input>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm