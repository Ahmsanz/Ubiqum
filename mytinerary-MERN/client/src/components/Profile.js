import React, {Component} from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Navbar2 from './Navbar2'

class Profile extends Component {


    state = {
        users: null,
        favourites: []
        
    }

    componentDidMount() {
        this.getUserByToken()
    }

    getUserByToken() {
        let token = localStorage.userToken
        
        let decoded = jwt_decode(token);

        
        
        axios.get('http://localhost:5000/users/' + decoded._id)
        .then (res => {console.log(res); this.setState({users: res.data})})
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
               

        this.props.history.push('/')

        
    }

    getFavouriteById () {
        if (this.state.users != null) {

        let id = this.state.users.favourites
        console.log(id)
        axios.get ('http://localhost:5000/itineraries/go/' + id)
        .then(res => {console.log(res.data); this.setState({favourites:[res.data]})})
        }
      }

      getAllFavourites () {
        if (this.state.users != null) {
        let itins = [];
        let ids = this.state.users.favourites
        console.log ('ids', ids)
        axios.get('http://localhost:5000/itineraries/all')
        .then (res => {itins.push(...res.data); console.log(res.data)})
        .catch(err => console.log('fuck, man', err))
        console.log('itinerarios', itins)

        
        let favs = "";
        
        for (let i = 0; i < itins.length; i++) {
           favs= itins.filter(itin => itin._id[i].indexOf(ids))
            
        }
        
        
    }
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
                <h4>Come a little closer</h4>
            </div>
        );

   
        
        this.getFavouriteById()
        
        let {favourites} = this.state;
                   
        let favouritesList = favourites.length ? (
            favourites.map( favourite => {
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
        );
        
        return (
            <div className = 'cuerpo'>
            <Navbar2 />
            <div className = 'cuerpo'>
            <div>
                <h2 id= 'who'>Profile</h2>
            </div>
                
            <div >
                {user}
            </div>
            <div>
                {favouritesList}
            </div>
            </div>
            </div>
        )


    }
}

export default Profile