import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logo from '../MYtineraryLogo.png'
import Arrow from '../arrow.png'
import {getCities} from '../store/actions/citiesActions'
import jwt_decode from 'jwt-decode'
import Navbar2 from './Navbar2'


class Redirect2 extends Component  {

    state = {
        cities: [
            {
                name: 'Barcelona',
                country: 'Spain'
            },
            {
                name: 'Madrid',
                country: 'Spain'
            },
            {
                name: 'Lisboa',
                country: 'Portugal'
            },
            {
              name: 'Paris',
              country: 'France'
            }
        ], 

        users: "",
        favourites: []
        
    }

  componentDidMount() {
     
   this.props.getCities()
   let citiesRetrieved = this.props.cities
   
   let token = this.props.location.pathname.slice(15) || localStorage.userToken
   localStorage.setItem ('userToken', token)

  
   this.getUserByToken(token)
      
   this.setState({
      cities: citiesRetrieved
      
    })
     
    }

  getUserByToken(token) {
     
      
      
      let decoded = jwt_decode(token);
      
      axios.get('http://localhost:5000/users/' + decoded._id)
      .then (res => {console.log(res); this.setState({users: res.data});})
      .catch(err => console.log(err, 'something went wrong'))
    }

    getFavourites () {
      axios.get ('http://localhost:5000/users/favourites/all')
      .then(res => {console.log(res.data); this.setState({favourites: res.data})})
    }

    
    
  render () {
      
      
      let userID = this.state.users._id
      sessionStorage.setItem('userID', userID)
      
     let citiesSliced = this.props.cities.slice(0,5)

    
       let {users} = this.state; 
      
     let citiesRenderd = citiesSliced.length ? (
       citiesSliced.map( city => {
        return (
          
          <div className = 'post card' key={city._id}>
          <img src = {city.image} />  
            <div className = 'card-content' >
              
              <h4 className = 'card-title red-text'>{city.name}</h4>   
              <p>{city.country}</p>         
            </div>
          </div>
          
        )
       })
       
       ) : (
         <div>
           <p> Getting there... </p>
         </div>
       );

       
      
       
       let user = users != null ? ( 
         
        
        <div className= 'center'>
          <h4 className='donde'>Welcome, {users.first_name}</h4>
          
        <div className="user-card ">
          <div>
            <img src = {users.picture} alt = 'do not remember that face' /> 
          </div> 
          
          <div className = 'user-content'>
            <h4 className="red-text">{users.first_name}</h4>
            <p>{users.last_name}</p>                
           
          </div>
          </div>
          </div>
        
                  
         
         ) : (
        <div className="center">Come closer, friend. I still cannot see you.</div>
    )

         
      
        return (
                    
          <div className="cuerpo">
            
            <Navbar2 />
            <div className="cabecera">
                <img id="logo" src={Logo} />
                <p>Find your perfect trip, designed by insiders who know and love their cities.</p>
            </div>
            <div className="arrow">
                <Link to = {'/Cities'}><img id="arrow" src={ Arrow } /></Link>
            </div>
            <div>
              <a href='/profile'>{user}</a>
            </div>
        
          </div>
        )



}
}
const mapStateToProps = (state) => {
  return {
    cities: state.city.cities,
    users: state.user.users
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    
    getCities: () => {dispatch(getCities())}
  }
}





export default connect (mapStateToProps, mapDispatchToProps) (Redirect2)
