
import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {addItinerary} from '../store/actions/itinerariesActions'


class Plans extends Component {



state = {
   
    title: "",
    city: "",
    img: "",
    nest: "",
    activities: ""
    
  }


  componentDidMount(){
    this.getPlans()
  }

  

  handleChangeTitle = (e) => {
    this.setState({

        title: e.target.value})
     

}


handleChangeCity = (e) => {
    this.setState({

        city: e.target.value})
      


}

handleChangeImage = (e) => {
  this.setState({

    img: e.target.value})
  


}

handleChangeRuta = (e) => {
  this.setState({

    nest: e.target.value})
  


}


 handleSubmit = (e) => {
   e.preventDefault()

  

   let newPlan = this.state;
   console.log(newPlan);


   
   let data = {
    method: 'post',
    data: { 
        
            
                title: newPlan.title,
                city: newPlan.city,
                img: newPlan.img,
                nest: newPlan.itinerary
            
        
    },
    headers: {'Content-Type': 'application/json' }
  }


  axios('http://localhost:5000/activities', data)

  .then(res => console.log(res.status))

  .catch(err => console.log(err))

 


this.setState({title: "", city: "",img: ""})




} 

getPlans = () => {
  axios.get('http://localhost:5000/activities/all')
  .then(res=>{console.log(res); this.setState({activities: res.data});})
  .catch(err=>console.log(err))

  
}

render() {
  console.log(this.props);
  
  
  
  let plans = this.state.activities;
    
  let plansList = plans.length ? (
    plans.map(plan => {
      return (
        
          
           <div className = 'user-card'>
            <div >
              <img src={plan.img} />
            </div>
            
              <div className='user-content'>
                <h4 className= 'red-text'>{plan.title}</h4>
                <p> {plan.city}</p>
              </div>
            </div>
          
          
        )
       
    })
  ) : (
    <div>
      <p>No plans yet</p>
    </div>
  )
    
        return (
          <div>
          
            
              <div className = 'container formulario'>
                <form onSubmit={this.handleSubmit} >
                <input name= 'título' type='text' className="text-input" onChange = {this.handleChangeTitle} value={this.state.name} placeholder="Name" />
                <input name= 'ciudad' type='text' className="text-input" onChange = {this.handleChangeCity} value={this.state.city} placeholder="City" />
                <input name= 'ruta' type='text' className="text-input" onChange = {this.handleChangeRuta} value={this.state.nest} placeholder="Itinerary" />
                <input name= 'image' type='text' className="text-input" onChange = {this.handleChangeImage} value={this.state.img} placeholder="URL" />
                
                <button className = 'btn waves-effect waves-light' > Add my plan!</button>
                
                </form>
              </div>
              <div className="planazo">
                { plansList }
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
    
  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Plans)