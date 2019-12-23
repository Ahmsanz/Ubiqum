import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import Cities from './components/Cities2'
import Register2 from './components/Register2'
import Users from './components/UsersBank'
import User from './components/User'
import Itineraries from './components/Itineraries'
import Itinerary from './components/Itinerary'
import City from './components/City'
import Plans from './components/Plans'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
import Redirect2 from './components/Redirect2'

import './Mytinerary.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component = {Landing} />
        <Route path = '/home/redirect' component = { Redirect2 } />
        <Route  exact path ='/Cities' component = {Cities} />
        <Route exact path = '/Itineraries' component = {Itineraries} />
        <Route exact path = '/Users' component = {Users} />
        <Route  exact path ='/Register' component= {Register2} />
        <Route  exact path ='/Plans' component= {Plans} />
        <Route exact path = '/LogIn' component = {LogIn} />
        <Route exact path = '/profile' component = {Profile} />
        <Route  path = '/cities/:city_id' component = {City} />
        <Route  path = '/users/:user_id' component = {User} />
        <Route  path = '/itineraries/:itinerary_id' component = {Itinerary} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
