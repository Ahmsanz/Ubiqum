import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import {getCities} from '../store/actions/citiesActions'
import {addCity} from '../store/actions/citiesActions'
import { connect } from 'react-redux'
import Navbar2 from './Navbar2'



class Cities extends Component {

    state = {
      
      content: ''
    }

    componentDidMount(){

         let citiesRetrieved = this.props.getCities()
         this.setState({cities: citiesRetrieved})
                
        
    }

    handleChange = (e) => {
    
       this.setState({content:e.target.value})
    
    }

   

    render(){
        
    
        let {cities} = this.props;
        
        let query = this.state.content
        let result = cities.filter(city => city.name.toUpperCase().startsWith(query.toUpperCase()))
       
        result != null ? (cities = result) : (cities = this.props.cities)
        
        const citiesList = cities.length ? (
            cities.map(city => {
                return (
                    
                        
                        <div className="post card" key = {city._id}>
                            <img src={city.image} alt="Your jorney to..."/>
                            <div className="card-content">
                                <Link to={'/cities/'+ city._id}>
                                <span className="card-title red-text">
                                    {city.name}
                                </span>
                                </Link>
                                <p>{city.country}</p>
                            </div>
                        </div>
                    
                )
            })
        ) : (
            <div className="center">Houston, we've got a problem with those cities</div>
        )
        return (
            <div>
            <Navbar2 />
            <div className = 'cuerpo'>
            <div className = 'filter'>
        
                            <label htmlFor="filter">Filter city by name: </label>
                            <input type="text"  ref="filter" value={this.state.content} onChange={this.handleChange} /*onSubmit={this.handleSubmit}*/ />
            </div>
                        
            <div className = ''>
                
                <h4 className="center donde">Where are we headed today?</h4>
                 {citiesList}
            </div>
            </div>
            </div>
        )
    }

}




const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
  return {
    cities: state.city.cities,
    
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (city) => {dispatch(addCity(city))},
    getCities: () => {dispatch(getCities())}
  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Cities)
