import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const deleteUser = (id) => dispatch => {

 return {
    type: 'DELETE_USER',
    id: id
    }

}


export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    user: user
  }
}


export const getUsers = () => dispatch => {

    axios.get('http://localhost:5000/users/all')
    .then(res=>{ console.log(res);
      dispatch({
      type: 'GET_USERS',
      payload: res.data
      })

  })
}

export const getUserByToken = () => dispatch => {

  let token = localStorage.userToken

  let decoded = jwt_decode(token);

  axios.get('http://localhost:5000/users/' + decoded._id)
  .then (res => {console.log(res);localStorage.setItem ('favs', [res.data.favourites]);
    dispatch({
      type: 'GET_USER_BY_TOKEN',
      user: res.data,
      favs: res.data.favourites
    })
  })
  .catch(err => console.log(err, 'something went wrong'))



}

export const getUserFavs = (ids) => dispatch => {

  let favs = [];

  ids.forEach(id => {
      axios.get ('http://localhost:5000/itineraries/go/' + id)
      .then(res => {console.log('favourites coming right away', res.status); favs.push(res.data);
          dispatch({
            type: 'GET_FAVOURITES',
            payload: favs
          })
        })
      .catch(err => console.log('oops, something went wrong with those favourites', err))

})


}

export const registerUser = (user) => dispatch => {
    let body = {
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      picture: user.picture,
      mail: user.mail,
      password: user.password
    }


    axios({
      method: 'post',
      url: 'http://localhost:5000/users',
      headerS: {
      'Content-Type': 'application/json'
      },
      data: body,

    }).then (res => { console.log(res.status);

      dispatch({
        type: 'REGISTER_USER',
        payload: res.data
      })

    })

}

export const loginUser = (user) => async dispatch => {
      let body = {
        mail: user.mail,
        password: user.password
      }

    axios({
        method: 'post',
        url: 'http://localhost:5000/auth',
        headers: ({'Content-Type': 'application/json'}),
        data: body
    })
    .then ((res) => { console.log(res); localStorage.setItem ('token', res.data.token)

      dispatch({
        type: 'LOGIN_USER',
        payload: res.data

      })

    }).then(function(){
      alert ('Welcome back')
    }).catch(err => console.log(err))


}
