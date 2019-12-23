import axios from 'axios'

export const addItinerary = (itinerary) => {
  return {
    type: 'ADD_ITINERARY',
    itinerary
  }
}

export const addPlan = (plan) => {
  return {
    type: 'ADD_PLAN',
    payload: plan
  }
}

export const getItineraries = () => dispatch => {
  
    axios.get('http://localhost:5000/itineraries/all')
    .then(res=>{ console.log(res);
      dispatch({
      type: 'GET_ITINERARIES',
      payload: res.data
      })

  })
 
  
}


