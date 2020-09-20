export const createNotification = (type,content) => {
    return async dispatch => {
        dispatch({type:type,content:content})
        await setTimeout(() => dispatch({type:"REMOVE"}),5000)
    }
}

const notificationReducer = (state = '',action) => {
    switch(action.type)
    {
        case 'ADD_BANNER':{
            console.log('in reducer')
            return action.content
        }
        case 'REMOVE':{
            return ''
        }
        default:return state
    }
}

export default notificationReducer