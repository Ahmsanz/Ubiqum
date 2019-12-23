import React from 'react'

import User from '../user.png'


function Navbar2 () {
   
    return (
       
        <div className='body'>


  
 
        <nav className='custom-navbar'>
    
      <a href="http://localhost:3000/profile" className="brand-logo-sm"><img id='user-logo' src={User} alt='home'/></a>
      
      
      <ul className = 'menu'>
        <li><a href="http://localhost:3000/home/redirect">Home</a></li>
        <li><a href="http://localhost:3000/Cities">Cities</a></li>
        <li><a href="http://localhost:3000/Itineraries">Itineraries</a></li>
        
      </ul>
      
      
    
  </nav>

  

  </div>


   
       
    )
    
    
};



export default Navbar2;