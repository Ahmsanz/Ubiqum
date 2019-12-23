import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getItineraries} from '../store/actions/itinerariesActions'
import axios from 'axios'

import {addItinerary} from '../store/actions/itinerariesActions'
import Navbar2 from './Navbar2'

class Itineraries extends Component {
    state = {
      
      name: "",
      city: "",
      rating: "",
      image: "",
      duration: "",
      price: "",
      hashtags: "",
      content: ""
    }

 

    componentDidMount (){

          this.props.getItineraries()

    };

    handleChangeSearch = (e) => {
      this.setState({content:e.target.value})
    }


    handleChangeName = (e) => {
      this.setState({

          name: e.target.value})
        console.log(this.state);


  }

  handleChangeCity = (e) => {
    this.setState({

      city: e.target.value})
    console.log(this.state);

  }

  handleChangeRating = (e) => {
    this.setState({

      rating: e.target.value})
    console.log(this.state);


  }

  handleChangeImage = (e) => {
    this.setState({

      image: e.target.value})
    console.log(this.state);


  }

  handleChangeDuration = (e) => {
    this.setState({

      duration: e.target.value})
    console.log(this.state);


  }

  handleChangePrice = (e) => {
    this.setState({

      price: e.target.value})
    console.log(this.state);


  }

  handleChangeHashtag = (e) => {
    this.setState({

      hashtags: e.target.value})
    console.log(this.state);


  }

   handleSubmit = (e) => {
     e.preventDefault()

     let newItinerary = this.state;
     console.log(newItinerary);

     let data = {
      method: 'post',
      data: {
          name: newItinerary.name,
          city: newItinerary.city,
          rating: newItinerary.rating,
          image: newItinerary.image,
          duration: newItinerary.duration,
          price: newItinerary.price,
          hashtags: newItinerary.hashtags
      },
      headers: {'Content-Type': 'application/json' }
    }


    axios('http://localhost:5000/itineraries', data)

    .then(res => console.log(res))

    .catch(err => console.log(err))

    this.props.addItinerary(newItinerary);


this.setState({name: "", city:"", rating:""})


}


    render() {
    console.log(this.props)
      let {itineraries} = this.props;

        let query = this.state.content;
        let result = itineraries.filter(itinerary => itinerary.city.toUpperCase().startsWith(query.toUpperCase()))
        result != null ? (itineraries = result) : (itineraries = this.props.itineraries)

        const itinerariesList = itineraries.length ? (
            itineraries.map(itinerary => {
                return (
                    <div className="post card" key = {itinerary._id}>
                        <img src={itinerary.image} alt="Your jorney to..."/>
                        <div className="card-content">
                            <Link to={'/itineraries/'+ itinerary._id}>
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
        console.log(itinerariesList);
        return (
          <div>
            <Navbar2 />
            <div className = 'cuerpo'>
            <div className='filtro'>
            <label htmlFor="it_filter">Filter itineraries by city name: </label>
            <input type="text" value={this.state.content} onChange={this.handleChangeSearch} /*onSubmit={this.handleSubmit}*/ />
            </div>
            
            
              <div >
                <h4 className="center">What you wanna do?</h4>
                {itinerariesList}
              </div>
              <div className = 'container formulario'>
                <form onSubmit={this.handleSubmit} >
                <input name= 'nombre' type='text' className="text-input" onChange = {this.handleChangeName} value={this.state.name} placeholder="Name" />
                <input name= 'ciudad' type='text' className="text-input" onChange = {this.handleChangeCity} value={this.state.city} placeholder="City Name" />
                <input name = 'puntuacion' type = 'number'  className="text-input" onChange = {this.handleChangeRating} value={this.state.rating} placeholder="Rating" />
                <input name= 'image' type='text' className="text-input" onChange = {this.handleChangeImage} value={this.state.image} placeholder="URL" />
                <input name= 'duration' type='text' className="text-input" onChange = {this.handleChangeDuration} value={this.state.duration} placeholder="Hours" />
                <input name= 'price' type='number' className="text-input" onChange = {this.handleChangePrice} value={this.state.price} placeholder="Price" />
                <input name= 'hashtag' type='text' className="text-input" onChange = {this.handleChangeHashtag} value={this.state.hashtag} placeholder="Hashtag" />
                <div className="acepto">
                <label>
                    <input type="checkbox" />
                    <span>I accept the terms and conditions</span>
                </label>
                <button className = 'btn waves-effect waves-light' > Add my plan!</button>
                </div>
                </form>
              </div>
              </div>
            </div>
          
        )

    }

}




const mapStateToProps = (state) => {

  
  return {
    itineraries: state.itinerary.itineraries
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addItinerary: (itinerary) => {dispatch(addItinerary(itinerary))},
    getItineraries: () => {dispatch(getItineraries())}
    
  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Itineraries)
