import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Navbar from './Navbar'
import {registerUser} from '../store/actions/usersActions'

class Register2 extends Component {
    state = {
        id: "",
        first_name: "",
        last_name: "",
        age: "",
        picture: "",
        mail: "",
        password:""

    }

    handleChangeName = (e) => {
        this.setState({
            first_name: e.target.value})


    }

    handleChangeLast = (e) => {
        this.setState({
            last_name: e.target.value})

    }

    handleChangeAge = (e) => {
        this.setState({
            age: e.target.value})

    }

    handleChangeMail = (e) => {
        this.setState({
            mail: e.target.value})


    }

    handleChangePic = (e) => {
        this.setState({
            picture: e.target.value})


    }

    handleChangePass = (e) => {
        this.setState({
            password: e.target.value})


    }
     handleSubmit =  (e) => {
        e.preventDefault()
        let user = this.state;
        this.props.registerUser(user);
        
        

      alert('Welcome, ' + this.state.first_name)

      this.setState({
        id: "",
        first_name: "",
        last_name: "",
        age: "",
        picture: "",
        mail: "",
        password:""

    })

        

        
    }



    render () {

        console.log(this.state);
        
        return (



            <div className = 'container formulario'>
                <h4 className ='donde'>Come, you shall not regret it</h4>
                <form className= 'login' onSubmit={this.handleSubmit} >
                <input name= 'nombre' type='text' className="text-input" onChange = {this.handleChangeName} value={this.state.first_name} placeholder="First Name" />
                <input name= 'apellido' type='text' className="text-input" onChange = {this.handleChangeLast} value={this.state.last_name} placeholder="Last Name" />
                <input name= 'edad' type='number' className="text-input" onChange = {this.handleChangeAge} value={this.state.age} placeholder="Age" />
                <input name= 'foto' type='text' className="text-input" onChange = {this.handleChangePic} value={this.state.picture} placeholder="Photo" />
                <input name = 'correo' type='text' className="text-input" onChange = {this.handleChangeMail} value={this.state.mail} placeholder="Email" />

                <p className = 'text-red'>Now, set a password</p>
                <input name = 'pass' type= 'text' className = 'text-input' onChange = {this.handleChangePass} value = {this.state.password} placeholder = 'Make it secure!' />
                <div className="acepto">
                <label>
                    <input type="checkbox" />
                    <span>I accept your demands</span>
                </label>
                <button className = 'btn waves-effect waves-light' > Join!</button>
                </div>
                </form>
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
      
      registerUser: (user) => {dispatch(registerUser(user))}
    }
  }
  

  export default connect (mapStateToProps, mapDispatchToProps) (Register2)
