import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteCity} from '../store/actions/citiesActions'
import {getItineraries} from '../store/actions/itinerariesActions'
import Navbar2 from './Navbar2'



class city extends Component {
  state = {
    itineraries: ""
  }
  
  componentDidMount(){
    this.getItineraries()
    
  }

  getItineraries = () => {
    let cityName=this.props.cities.name
    
       axios.get ('http://localhost:5000/itineraries/' + cityName)
      .then(res=> {console.log(res); this.setState({itineraries: res.data}) })
      .catch(err=> console.log(err))


      
    }

    render = () => {
     
        let city = this.props.cities ? (
            <div className="post card">
              <img src={this.props.cities.image} />
                <h4 className="center">{this.props.cities.name}</h4>
                <p className='center'>{this.props.cities.country}</p>

            </div>
        ) : (
            <div className="center">Looking for those fuckers...</div>
        );

        let misItinerarios = this.state.itineraries
              
        let itinerariesList = misItinerarios.length ? (
          
          misItinerarios.map(itinerary => {
            
              return (
                  <div className="center post card" key = {itinerary._id}>
                      <img src={itinerary.image} alt="Your jorney to..."/>
                      <div className="card-content">
                          <Link to={'../itineraries/'+ itinerary._id}>
                          <span className="card-title red-text">
                              {itinerary.name}
                          </span>
                          </Link>
                          <p>{itinerary.city}</p>
                      </div>
                  </div>
              )
          })
      ) : (
        
          <div className="center">No plans for today</div>
      )

        return (
          
            <div className="cuerpo">
            <Navbar2 />
            <div>
              { city }
            </div>
            <div>
              <h4 className = 'center donde'>What would you like to do?</h4>
              { itinerariesList }
            </div>
          </div>
        )
        }
}



const mapStateToProps = (state,ownProps) => {

  let id = ownProps.match.params.city_id;
 
  return {
    cities: state.city.cities.find(city => city._id == id),
    itineraries: state.itinerary.itineraries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: (id) => { dispatch(deleteCity(id))},
    getItineraries: () => {dispatch(getItineraries())}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(city)
