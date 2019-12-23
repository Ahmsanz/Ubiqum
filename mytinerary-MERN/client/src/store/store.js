import {createStore} from 'redux';
import usersReducer from './reducers/usersReducer'

const store = createStore(usersReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store; 