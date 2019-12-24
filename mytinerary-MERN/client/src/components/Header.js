import React from 'react'
import Logo from '../MYtineraryLogo.png'

 function Header() {
    return (
      <div>
        <div>
            <div className="cabecera">
                <img id="logo" src={Logo} />
                <p>Find your perfect trip, designed by insiders who know and love their cities.</p>
            </div>
            
          </div>
          <div className = 'registro'>
          <a href='./register'><button id="registrobut" className = 'waves-effect waves-light btn' type='submit' >Register<i className="material-icons right">send</i></button></a>
              <a href= './login'><button href='./login' id="loginbut" className = 'waves-effect waves-light btn' type='submit' >Log in<i className="material-icons right">send</i></button></a>
              <a href= 'http://localhost:5000/google/google'><button id="loginbut"    className = 'waves-effect waves-light btn' type='submit' >Log in with Google<i className="material-icons right">send</i></button></a>
          </div>
        </div>
    )
}

export default Header
