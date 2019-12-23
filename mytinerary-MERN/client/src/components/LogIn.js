import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {loginUser} from '../store/actions/usersActions'
import Navbar2 from './Navbar2'


class LogIn extends Component {


    state = {
        mail: "",
        password: "",
    }

    handleChangeMail = (e) => {
        this.setState ({
            mail: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState ({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
         let user = this.state

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
        .then ((res) => { 
            console.log(res); 
            localStorage.clear(); sessionStorage.clear();
            localStorage.setItem ('userToken', res.data.token)
            alert('Welcome')
            

        })
        .then(
            this.props.history.push('home/redirect')
        )
        .catch(err => alert('Something went wrong! Try again, please.'))
                
        
        this.setState ({
            mail: "",
            password: ""
        })
        
    }


    render () {
        console.log(this.props)
        console.log(localStorage)

        return (
            <div className='cuerpo'>
            <Navbar2/>
            <div>
                <h4 id='who'>Please choose how you'll log in to the app</h4>
            </div>
                
            <div className = 'reg'>
                <form className= 'login' onSubmit= {this.handleSubmit}>
                    <input type= 'text' onChange= {this.handleChangeMail} value = {this.state.mail} placeholder= 'Mail' />
                    <input type= 'password' onChange= {this.handleChangePassword} value = {this.state.password} placeholder = 'password' />
                    <button className= 'logea' className = 'waves-effect waves-light'> Log In</button>
                </form>
                <a href='http://localhost:5000/auth/google'><button id="loginbut" href= '/google' className = 'waves-effect waves-light logea' type='submit' >Log in with Google<i className="material-icons right">send</i></button></a>
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
      
      loginUser: (user) => {dispatch(loginUser(user))}
    }
  }
export default connect (mapStateToProps, mapDispatchToProps) (LogIn)