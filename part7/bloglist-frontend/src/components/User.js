import React from 'react'

const User = ({user}) => {

    if(!user)
        return null
        
    return (
        <div>
            <h3>USER</h3>
            <h4>{user.name}</h4>
            <label>added blogs</label>
            <ul>
                {user.blogs.map(blog => (
                    <li>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User