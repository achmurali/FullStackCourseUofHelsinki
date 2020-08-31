const filterReducer = (state = '',action) => {
    console.log(state)
    switch(action.type){
        case 'FILTER' : return action.filter
    }
    return state
}

export default filterReducer