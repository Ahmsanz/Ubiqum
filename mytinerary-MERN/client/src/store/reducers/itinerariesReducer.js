const initState = {

    itineraries: [],
    comments: []
  }

  const itinerariesReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_ITINERARY':
        return {
          ...state,
          itineraries: [...state.itineraries, action.itinerary]


       }
       case 'ADD_PLAN':
         return {
           ...state,
           activities: [...state.activities, action.payload]
         }
       case 'GET_ITINERARIES':

        return {
          ...state,
          itineraries: [...action.payload]
        }

      case 'GET_COMMENTS':
        return {
          ...state,
          comments: action.comments
        }
        
      case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.comment]
      }

    default:
        console.log("another action")
  }

  return state;
}

  export default itinerariesReducer
