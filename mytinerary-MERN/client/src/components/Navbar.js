import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import User from '../user.png'


function Navbar () {
    
    return (
       
        <div className='body'>


  
 
        <nav className='custom-navbar'>
    
      <a href="./profile" className="brand-logo-sm"><img id='user-logo' src={User} alt='home'/></a>
      
      
      <ul className = 'menu'>
        <li><a href="http://localhost:3000/">Home</a></li>
        <li><a href="http://localhost:3000/Login">LogIn</a></li>
        
        
      </ul>
      
      
    
  </nav>

  

  </div>


   
       
    )
    
    
};



export default Navbar;