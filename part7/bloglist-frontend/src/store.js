import { createStore,combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
    blogs:blogReducer,
    notification:notificationReducer,
    users:usersReducer
})

const store = createStore(reducer,composeWithDevTools(
    applyMiddleware(thunk)
))

export default store