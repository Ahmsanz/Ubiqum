import axios from 'axios'

export const addCity = (city) => {
  return {
    type: 'ADD_CITY',
    city
  }
}

export const getCities = () => dispatch => {
    console.log("Estoy en el axios")
    axios.get('http://localhost:5000/cities/all')
    .then(res=>{ 
      console.log("Respuesta")
      console.log(res);
      dispatch({
      type: 'GET_CITIES',
      payload: res.data
      })

  })
}

export const deleteCity = () => dispatch => {

  axios.delete('http://localhost:5000/cities/all', {params: {_id: '5dd606803778d4078ffd5832'}})
  .then(res=>{ console.log(res);
    dispatch({
    type: 'DELETE_CITY',
    payload: res.data
    })

})
}