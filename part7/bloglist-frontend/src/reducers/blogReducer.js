import blogService from '../services/blogs'


export const initialzeBlogs = () => {
    return async dispatch => {
        const result = await blogService.getAll()
        console.log(result)
        dispatch({
            type:'INIT',
            data:result
        })
    }
}

export const createBlogAction = (data) => {
    return async dispatch => {
        const result = await blogService.create(data)
        dispatch({
            type:'ADD',
            data:result
        })
    }
}


const blogReducer  = (state = [],action) => {
    switch(action.type)
    {
        case 'INIT' : {
            return action.data
        }
        case 'ADD' : {
            return [...state,action.data]
        }
        case 'DELETE' : {
            return state.filter(obj => obj.id != action.id)
        }
        case 'LIKE' : {
            let newObj = state.find(obj => obj.id === action.id)
            const test = {...newObj,likes:newObj.likes+1}
            return state.map(obj => obj.id === action.id ? test : obj)
        }
        default : return state
    }
}

export default blogReducer 
