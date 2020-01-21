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

export const getComments = () => dispatch => {

    axios.get('http://localhost:5000/comments/all')
    .then(res => { console.log(res, 'comments comming');
      dispatch({
        type: 'GET_COMMENTS',
        comments: res.data
      })
    })
    .catch(err => console.log("can't get those comments", err))



}

// export const addComment = (user, comment) => dispatch => {
  // let date = new Date();
  //
  // let body = {
  //       user: user,
  //       itinerary: comment.itinerary,
  //       description: comment.description,
  //       date: date.toDateString(),
  //       likes:""
  //     }
  //
  // axios({
  //       method: 'post',
  //       url: 'http://localhost:5000/comments',
  //       headers: {
  //       'Content-Type': 'application/json'
  //       },
  //       data: body,
  //
  //     }).then (res => { console.log(res.status);
  //         dispatch ({
  //           type: 'ADD_COMMENT',
  //           comment: res.data,
  //           })
  //
  //     })
  //
  //     .catch(err => (console.log('Your comment did not register', err)))

  export const addComment = (comment) => {
    return {
      type: 'ADD_COMMENT',
      comment: comment
    }
  }
