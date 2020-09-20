import UserService from '../services/users'
 
export const initializeUsers = () => {
    return async dispatch => {
        const result = await UserService.getAllUsers()
        dispatch({
            type:'InitializeUsers',
            data:result
        })
    }
}

const usersReducer = (state = [],action) => {
    switch(action.type){
        case 'InitializeUsers':{
            return action.data
        }
        default:return state
    }
}

export default usersReducer