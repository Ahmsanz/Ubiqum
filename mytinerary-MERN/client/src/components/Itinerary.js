import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {getItineraries} from '../store/actions/itinerariesActions'
//import {deleteUser} from '../store/actions/usersActions'
import Navbar2 from './Navbar2'



class Itinerary extends Component {
state = {
  activities:"",
  city: "",
  itinerary: "",
  start: ""
}

componentWillMount(){
 this.getItineraryById()


  
 
}

getPlans =  () => {
      

      let itinerary = this.state.start.nest
           
     axios.get('http://localhost:5000/activities/plan/' + itinerary)
      .then(res=>{console.log(res); this.setState({activities: res.data})
      })
      .catch(err=>console.log(err))
      
    }

getItineraryById () {
      
      let id = this.props.location.pathname.slice(13)
      
      let itinerary = this.state.start.nest
      
      axios.get('http://localhost:5000/itineraries/go/' + id)
      .then(res => {this.setState({start: res.data}); console.log(res.data); sessionStorage.setItem('itinerary_id', res.data._id);
      sessionStorage.setItem('itinerary_name', res.data.name)
      sessionStorage.setItem('itinerary_city', res.data.city)
      sessionStorage.setItem('itinerary_image', res.data.image)
    })
      .then (
        axios.get('http://localhost:5000/activities/plan/' + itinerary)
      .then(res=>{this.setState({activities: res.data})
      })
      .catch(err=>console.log(err))
      )
      
      .catch (err => { console.log('Oops... Something went wrong!', err)})

      
    }

addFavItinerary (itinerary) {
            
      let userID = sessionStorage.userID
      

      axios.put ('http://localhost:5000/users/' + userID + '/itineraries/' + itinerary, {headers: {'Content-Type': 'application/json'}})
      .then(res => console.log(res, 'I like this!'))
      .catch(err=> console.log(err))
    }

    handleClick = (e) => {
      let itinerary = sessionStorage.itinerary_id
      
     this.addFavItinerary(itinerary);
    }

    
    render () {
            
      this.getPlans()
      

        let itinerary = this.state.start  ? (
          
            <div className="post card">
              <img src= {this.state.start.image} />
                <h4 className="center">{this.state.start.name}</h4>
                <p className='center'>{this.state.start.city}</p>
                <button id = 'megusta' onClick={this.handleClick}>Me gusta!</button>
              </div>

              
          
            
        ) : (
            <div className="center">Wait, please</div>
        )
          
        let {activities} = this.state
                   
        
        let activitiesList = activities.length ? (
          activities.map(activity => {
         return ( 
            <div className="card actividades">
                        <div className= 'card-image'>
                        <img src={activity.img} alt="Your jorney to..."/>
                        </div>
                        <div className='card-stacked'>
                        <div className="card-content">
                            <span className="card-title red-text">
                                {activity.title}
                            </span>
                            
                            
                        </div>
                        </div>
                    </div>
          )})
          
          ) : (
          <div className="center">No activities in this city yet</div>
        )

        return (
          <div className='cuerpo'>
          <Navbar2 />
            <div >
              <div>
                { itinerary }
              </div>
              <div>
                <h4 className = 'red-text center'>Take a look at this plans!</h4>
                { activitiesList }
              </div>
            </div>
            </div>
        )
        }
}

const mapStateToProps = (state,ownProps) => {
  
  let id2 = ownProps.location.pathname.slice(13)
  
  return {
    itinerary: state.itinerary.itineraries.find(itinerary => itinerary._id == id2)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItineraries: () => dispatch(getItineraries())
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
