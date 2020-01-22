import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Navbar2 from './Navbar2';
import {getUserByToken, getUserFavs} from '../store/actions/usersActions';


class Favourites extends Component {

  state = {
    favs: ""
  }



    componentDidMount () {
      console.log('estado', this.state);
      console.log('propiedades', this.props)
    }

    // componentWillReceiveProps ( nextProps) {
    //   let ids = nextProps.favs;
    //   console.log('ids', ids);
    //
    //   this.props.getUserFavs(ids);
    //   console.log('new state', this.state);
    //   console.log ('new props', nextProps)
    //   // this.props.getUserFavs(ids);
    // }

    // static getDerivedStateFromProps (props, state){
    //   let favs = props.favs;
    //   props.getUserFavs(favs);
    //   return {
    //     favourites: favs
    //   }
    // }

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
        console.log ('props', this.props)

        // let favs = this.props.favs;
        // console.log ('favs children', favs)

        // let favourites = user;

        // console.log(favourites)
        let {favourites} = this.props;

        let favouritesList = favourites.length ? (
            favourites.map( favourite => {
                return (
                    <div className= 'center'>
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
              <h4 className='donde'>You love these itineraries: </h4>
                {favouritesList}
            </div>

        )


    }
}

Favourites.defaultProps = {
  favs: [],
  favourites: []
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    favs: state.user.favs,
    favourites: state.user.favourites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getUserByToken: () => {dispatch(getUserByToken())},
    getUserFavs: (ids) => {dispatch(getUserFavs(ids))}

  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Favourites)
