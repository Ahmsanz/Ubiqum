import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {getItineraries} from '../store/actions/itinerariesActions'
import Navbar2 from './Navbar2'



class Itinerary extends Component {

    state = {
      activities:"",
      city: "",
      itinerary: "",
      start: "",
      comments: []
    }

    componentDidMount(){
      this.props.getItineraries();
     // this.getItineraryById()

    }

    // componentDidUpdate () {
    //   this.getPlans();
    // }


    getPlans =  () => {


          let itinerary = this.props.itinerary.nest

         axios.get('http://localhost:5000/activities/plan/' + itinerary)
          .then(res=>{console.log(res); this.setState({activities: res.data})
          })
          .catch(err=>console.log(err))

        }

    getCommentsByItin = () => {
      let itinerary = this.props.itinerary.name;

      axios.get ('http://localhost:5000/comments/go/' + itinerary)
      .then(res => {console.log('comments', res.data)})
      .catch(err => console.log ('cannot find any comments', err))
    }

    

    addFavItinerary (itinerary) {

          let userID = sessionStorage.userID

          axios.put ('http://localhost:5000/users/' + userID + '/itineraries/' + itinerary, {headers: {'Content-Type': 'application/json'}})
          .then(res => console.log(res, 'I like this!'))
          .catch(err=> console.log(err))
        }

    handleClick = (e) => {

          let itinerary = this.props.itinerary._id;

         this.addFavItinerary(itinerary);
        }


    render () {
      console.log(this.state)
      console.log(this.props);

        let {itinerary} = this.props;

        let renderedItinerary = itinerary != undefined ? (

            <div className="post card">
              <img src= {itinerary.image} />
                <h4 className="center">{itinerary.name}</h4>
                <p className='center'>{itinerary.city}</p>
                <p className='center'>Rating: {itinerary.rating}</p>
                <p className='center'>Duration: {itinerary.duration} hours</p>
                <p className='center'>Price: {itinerary.price}€</p>
                <p className='center'>#{itinerary.hashtag}</p>
                <button id = 'megusta' onClick={this.handleClick}>Me gusta!</button>
              </div>


        ) : (
            <div className="center">Wait, please</div>
        )

        let {activities} = this.state;


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
                { renderedItinerary }
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

  let id = ownProps.location.pathname.slice(13)

  return {
    itinerary: state.itinerary.itineraries.find(itinerary => itinerary._id == id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItineraries: () => dispatch(getItineraries())
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
