import React, {Component} from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Navbar2 from './Navbar2'
import Favourites from './Favourites'


class Profile extends Component {


    state = {
        users: null,
        favourites: ""

    }

    componentDidMount() {
        if (localStorage.userToken) {
        this.getUserByToken()

        }

    }


    getUserByToken() {

        let token = localStorage.userToken

        let decoded = jwt_decode(token);



        axios.get('http://localhost:5000/users/' + decoded._id)
        .then (res => {console.log(res.data.favourites); this.setState({users: res.data, favourites: this.getAllFavourites(res.data.favourites)})})
        .catch(err => console.log(err, 'something went wrong'))



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

    // getFavouriteById () {
    //     if (this.state.users != null) {
    //
    //     let id = this.state.users.favourites
    //     console.log(id)
    //     axios.get ('http://localhost:5000/itineraries/go/' + id)
    //     .then(res => {console.log(res.data); this.setState({favourites:[res.data]})})
    //     }
    //   }
    //
      getAllFavourites (ids) {
          let favs = [];
          // if (this.state.users != null) {
          //   let ids = this.state.users.favourites
          //     if (ids) {

                  ids.forEach(id => {
                    axios.get ('http://localhost:5000/itineraries/go/' + id)
                    .then(res => {console.log('favourites coming right away', res.status); favs.push(res.data)})
                  });

              //     }
              // }
              console.log('favs', favs);
              return favs;
        }




    render () {
        console.log ('state', this.state)


        let users = this.state.users;

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



        let {favourites} = this.state ;


        let favsList = favourites.length ? (
            favourites.favs.map( favourite => {
                return (
                    <div className= 'center'>
                      <h4 className='donde'>You love these itineraries: </h4>

                      <div className="user-card ">
                      <div>
                        <img src = {favourite.image} alt = 'do not remember that face' />
                      </div>

                      <div className = 'user-content'>
                        <h4 className="red-text">{favourite.name}</h4>
                        <p>{favourite.city}</p>

                      </div>
                      </div>
                    </div>
                )
                })
        ) : (
            <div>
            <p className='donde'>You don't have any favourites yet.</p>
            </div>
        )
        console.log (favourites)
        return (
            <div>
            <Navbar2 />
            <div className = 'cuerpo'>
            <div>
                <h2 id= 'who'>Profile</h2>
            </div>

            <div >
                {user}
            </div>
            <div>
              {favsList}
            </div>
            </div>
            </div>
        )


    }
}

export default Profile
