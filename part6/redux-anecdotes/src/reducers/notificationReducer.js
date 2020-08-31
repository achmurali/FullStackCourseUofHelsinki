const initialState = ''
const notificationReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD' : {
            return action.content
        }
        case 'VOTE' : {
            return action.content
        }
        case 'REMOVE_BANNER' : {
            return ''
        }
        default: return state
    }
}

export default notificationReducer