import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getUsers, registerUser, addUser, deleteUser} from '../store/actions/usersActions'
import axios from 'axios'
import Verdugo from '../verdugo.jpeg'



class Users extends Component {
    state = {


      first_name: "",
      last_name: "",
      mail: "",
      password: ""

    }


    componentDidMount(){

         this.props.getUsers()


    };


    handleChangeName = (e) => {
      this.setState({

          first_name: e.target.value})



  }

  handleChangeLast = (e) => {
    this.setState({

      last_name: e.target.value})


  }

  handleChangeMail = (e) => {
    this.setState({

      mail: e.target.value})

  }

  handleChangePassword = (e) => {
    this.setState({

      password: e.target.value})

  }

   handleSubmit = (e) => {
     e.preventDefault()

     let user = this.state;


    this.props.registerUser(user);

    this.props.addUser(user);


  this.setState({first_name: "", last_name:"", mail:"", password:""});


}


    render() {



        let {users} = this.props;

        let userList = users.length ? (
            users.map(user => {
                return (
                    <div className="post card" key = {user._id}>

                        <div className="card-content">
                        {/* <img className = 'card-image' src={user.picture} /> */}
                            <Link to={'/users/'+ user._id}>
                            <span className="card-title red-text">
                                {user.first_name}
                            </span>
                            </Link>
                            <p>{user.last_name}</p>
                        </div>
                    </div>
                )
            })
        ) : (
            <div className="center">Noone's left, my Lord</div>
        )

        return (

            <div className="container home">

                <h4 className="center donde">Already in MYtinerary:</h4>
                <div className= 'catalogo'>
                {userList}
                </div>

              <div className = 'container formulario'>
                <form onSubmit={this.handleSubmit} >
                <input name= 'nombre' type='text' className="text-input" onChange = {this.handleChangeName} value={this.state.first_name} placeholder="First Name" />
                <input name= 'apellido' type='text' className="text-input" onChange = {this.handleChangeLast} value={this.state.last_name} placeholder="Last Name" />
                <input name = 'correo' type='text' className="text-input" onChange = {this.handleChangeMail} value={this.state.mail} placeholder="Mail" />
                <input name = 'contraseña' type='text' className="text-input" onChange = {this.handleChangePassword} value={this.state.password} placeholder="Password" />
                <div className="acepto">
                <label>
                    <input type="checkbox" />
                    <span>I accept the terms and conditions</span>
                </label>
                <button className = 'btn waves-effect waves-light' > Join!</button>
                </div>
                </form>
              </div>
              </div>


        )

    }

}




const mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {dispatch(addUser(user))},
    getUsers: () => {dispatch(getUsers())},
    deleteUser: () => {dispatch(deleteUser())},
    registerUser: (user) => {dispatch(registerUser(user))}
  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Users)
