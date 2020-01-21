import React, {Component} from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Navbar2 from './Navbar2'

class Favourites extends Component {

    state = {
      favs:"",
      favourites: ""
    }

    componentDidMount () {
      console.log('estado', this.state);
      console.log('propiedades', this.props)
    }

    componentDidReceiveProps() {

        this.getAllFavourites(this.props.favs);

    }

    getAllFavourites (ids) {
      let favs = [];

          ids.forEach(id => {
              axios.get ('http://localhost:5000/itineraries/go/' + id)
              .then(res => {console.log('favourites coming right away', res.status); favs.push(res.data)})
            });

            console.log('holaa', favs)
            this.setState({favourites: favs})


        }




    render () {
        console.log ('state', this.state)
        console.log ('props', this.props.favs)

        // let favs = this.props.favs;
        // console.log ('favs children', favs)

        // let favourites = user;

        // console.log(favourites)
        let favs = this.props;
        console.log(favs.favs)
        let favouritesList = favs.length ? (
            favs.favs.map( favourite => {
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
            <div>
                {favouritesList}
            </div>

        )


    }
}

export default Favourites
