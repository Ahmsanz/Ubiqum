import axios from 'axios';

const initState = {
  users: []
}


const usersReducer = (state=initState, action) => {
  switch(action.type){
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.user]         
        
                  
     }
     case 'REGISTER_USER':
       return {
         ...state,
         users: [...state.users, action.payload]
       }
    case 'DELETE_USER':
        let newUsers = state.users.filter(user => {
                return action.id !== user._id
              });
              return {
                ...state,
                users: newUsers
              }
    case 'GET_USERS':
      
      return {
        ...state,
        users: [...action.payload]
        
        
      }

    case 'LOGIN_USER':
      return {
        ...state, 
        users: [action.payload]
      }
    default:
        console.log("another action")

}
return state; 

}

export default usersReducer
