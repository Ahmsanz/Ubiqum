import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Navbar2 from './Navbar2'
import Favourites from './Favourites'
import {getUserByToken, getUserFavs} from '../store/actions/usersActions'


class Profile extends Component {


    state = {
        users: "",
        favs: []

    }

    componentDidMount () {
      if (localStorage.userToken) {
        this.props.getUserByToken();

      }

      if (localStorage.favs) {

        let ids = localStorage.favs.split(',');

        this.props.getUserFavs(ids);
      }
    }



    handleClick = (e) => {
        e.preventDefault()
        this.setState({users: null})
        sessionStorage.clear();
         axios({
            method: 'get',
            url: 'http://localhost:5000/auth/logout',

        })
        .then (res => {console.log(res, 'Farewell, friend') })
        .then(alert('Hope to see you soon!'))
        .catch (err => console.log(err))

        localStorage.clear();

        this.props.history.push('/')


    }


    render () {

        let users = this.props.users;

        let user = users != null ? (
            <div className = 'perfil'>
            <div>
                <img src = {users.picture} alt='Cannot see your face from here' />
            </div>
            <div className = 'info'>
                <h3 className = 'donde center'>Welcome, {users.first_name}. Nice to see you again.</h3>
                <h4 className = 'donde'> This is what we know about you:</h4>
                <div className = 'datos'>
                <ul >
                    <li>Name: {users.first_name + ' ' + users.last_name}</li>
                    <li>Age: {users.age}</li>
                    <li>Mail: {users.mail}</li>

                </ul>
                </div>
            </div>
            <button className='logea' onClick={this.handleClick}>Log out</button>
            </div>
        ) : (
            <div>
                <h4 className='donde center'>Come a little closer...</h4>
                <div>
                    <p className = 'center'> OOPS! </p>
                    <p className = 'center'>  Looks like you're still not logged in. </p>
                    <p className = 'center'>  Try doing it now, or register to be one of us!</p>
                    <div className = 'registro'>
                        <a href='./register'><button id="registrobut" className = 'waves-effect waves-light btn' type='submit' >Register<i className="material-icons right">send</i></button></a>
                        <a href= './login'><button href='./login' id="loginbut" className = 'waves-effect waves-light btn' type='submit' >Log in<i className="material-icons right">send</i></button></a>
                        <a href= 'http://localhost:5000/google/google'><button id="loginbut"    className = 'waves-effect waves-light btn' type='submit' >Log in with Google<i className="material-icons right">send</i></button></a>
                    </div>
                </div>

            </div>
        );


      let favs = this.props.favourites;

      let favsList = favs.length ? (
            favs.map( fav => {
                return (

                    <div className= 'center'>

                      <div className="user-card" key = {fav._id} >
                        <div>
                          <img src = {fav.image} alt = 'it is kinda foggy' />
                        </div>

                      <div className = 'user-content'>
                        <h4 className="red-text">{fav.name}</h4>
                        <p>{fav.city}</p>
                      </div>
                      </div>
                    </div>
                )
                })
        ) : (
            <div>
              <p className='donde'>You don't have any favourites yet.</p>
            </div>
        );

        return (
            <div>
              <Navbar2 />
              <div className = 'cuerpo'>
                <div>
                  <h2 id= 'who'>Profile</h2>
                </div>
                <div>
                  {user}
                </div>
                <div>
                 <h4 className = 'donde'> You love these itineraries </h4>
                  {favsList}

                </div>
              </div>
            </div>
        )

    }
}

Profile.defaultProps = {
  favs: [],
  favourites: []
}
const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    favs: state.user.favs,
    favourites: state.user.favourites
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    getUserByToken: () => {dispatch(getUserByToken())},
    getUserFavs: (ids) => {dispatch(getUserFavs(ids))}

  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Profile)
