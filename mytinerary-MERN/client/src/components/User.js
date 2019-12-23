import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {deleteUser} from '../store/actions/usersActions'



class User extends Component {
  handleClick = (e) => {
    let id = this.props.users._id
    this.props.deleteUser(id);
    
   
    axios.delete('http://localhost:5000/users/' + id)
    .then(res=>console.log(res))
    .catch(err=>console.log(err)
    )
    
    this.props.history.push('/Users');
  }

    render () {
            
        const user = this.props.users ? (
          
            <div className="user-card ">
              <div>
                <img src = {this.props.users.picture} alt = 'do not remember that face' /> 
              </div> 
              
              <div className = 'user-content'>
                <h4 className="red-text">{this.props.users.first_name}</h4>
                <p>{this.props.users.last_name}</p>                
                <button id='kill' className="btn red" onClick={this.handleClick}>Delete user</button>
              </div>
              </div>
            
        ) : (
            <div className="center">Looking for those fuckers...</div>
        )

        return (
            <div className="container">
                { user }
            </div>
        )
        }
}

const mapStateToProps = (state,ownProps) => {
  
  let id = ownProps.match.params.user_id;
  
  return {
    users: state.user.users.find(user => user._id == id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => { dispatch(deleteUser(id))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)
