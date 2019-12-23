import React, {Component} from 'react'
import { connect } from 'react-redux'

import Navbar from './Navbar'
import Header from './Header'
import {getCities} from '../store/actions/citiesActions'



class Landing extends Component  {

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
        ]
    }

    componentDidMount() {
     
   this.props.getCities()
   let citiesRetrieved = this.props.cities

     this.setState({
       cities: citiesRetrieved
     })
     console.log(citiesRetrieved);
    }
    
  render () {
    
      console.log(this.state);
      console.log(this.props);
      console.log('cachee',window.localStorage)
     let citiesSliced = this.props.cities.slice(0,5)
     console.log(citiesSliced);
     let citiesRenderd = citiesSliced.length ? (
       citiesSliced.map( city => {
        return (
          
          <div className = 'city-card' key={city._id}>
          
          <img src = {city.image} /> 
            <div className = 'city-content' >
              
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
       )
      
      
        return (
          <div className="cuerpo">
            
            <Navbar/>
            <Header />
           <div className = 'cities'>
             {citiesRenderd}
           </div>
          </div>
        )



}
}
const mapStateToProps = (state) => {
  return {
    cities: state.city.cities
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    
    getCities: () => {dispatch(getCities())}
  }
}





export default connect (mapStateToProps, mapDispatchToProps) (Landing)
