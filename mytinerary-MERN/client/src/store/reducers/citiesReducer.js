

const initState = {
  cities: []
}



const citiesReducer = (state=initState, action) => {
  switch(action.type){
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, action.city]


     }
    case 'DELETE_CITY':
        let newCities = state.cities.filter(city => {
                return action.id !== city.id
              });
              return {
                ...state,
                cities: newCities
              }
    case 'GET_CITIES':

      return {
        ...state,
        cities: [...action.payload]


      }
    default:
        console.log("another action")

}
return state;

}


export default citiesReducer
