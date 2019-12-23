
import citiesReducer from './citiesReducer'
import usersReducer from './usersReducer'
import itinerariesReducer from './itinerariesReducer'
import {combineReducers} from 'redux'


export default combineReducers({

  user: usersReducer, 
  city: citiesReducer, 
  itinerary: itinerariesReducer

})



