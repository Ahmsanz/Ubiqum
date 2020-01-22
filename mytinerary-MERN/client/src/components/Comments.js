import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserByToken} from '../store/actions/usersActions'
import {getComments, addComment, getCommentsByItin} from '../store/actions/itinerariesActions'
import axios from 'axios'


class Comments extends Component {

  state = {
    itinerary: "",
    description: "",
    comments: []
  }


  static getDerivedStateFromProps(props, state) {
    console.log('deriving props', props)
    console.log('deriving state', state)
    let name = props.itin.name;

    return {
      itinerary: props.itin

    }
  }

  componentDidMount() {
      if (localStorage.userToken) {

        this.props.getUserByToken();
        }


      console.log('initial state', this.state);
      console.log('initial props', this.props);

      if (this.props.itin.name != undefined) {
      this.getCommentsByItin(this.props.itin.name)

    }else {
      setInterval(this.getCommentsByItin(this.props.itin.name), 4000)
    }


      }


  
getCommentsByItin(itin) {
  axios.get ('http://localhost:5000/comments/go/' + itin)
  .then (res => this.setState({comments: res.data}))
  .catch ( err => console.log(err))
}



addComment = () => {
  let date = new Date();

  let body = {
        user: this.props.users,
        itinerary: this.props.itinerary,
        description: this.state.description,
        date: date.toDateString(),
        likes:""
      }

  axios({
        method: 'post',
        url: 'http://localhost:5000/comments',
        headerS: {
        'Content-Type': 'application/json'
        },
        data: body,

      }).then (res => { console.log(res.status)}).catch(err => (console.log('Your comment did not register', err)))


  }


  handleChangeItin = (e) => {
        this.setState({

            itinerary: e.target.value})

    }
  handleChangeDescription = (e) => {
      this.setState({

          description: e.target.value})

  }


   handleSubmit = (e) => {
     e.preventDefault()
     let {users} = this.props;
     let comment = {
       itinerary: this.props.itinerary,
       description: this.state.description,
       user: {
         first_name: users.first_name,
         picture: users.picture
       }
     }
     this.addComment();
     this.props.addComment(comment);


  this.setState({itinerary: "", description:""});


}


    render() {


      console.log(this.props);
      console.log(this.state)


        let {comments} = this.state;

        let commentsList = comments.length ? (
            comments.map(comment => {
                return (

                    <div className="comment-card" key = {comment._id}>

                        <div className="comment-content">
                          <div className = 'comment-header'>
                            <img className = 'card-image' src={comment.user.picture} />
                            <div>
                                <p className="card-title red-text">
                                  {comment.user.first_name}
                                </p>
                                <p>{comment.itinerary}</p>
                            </div>
                           </div>

                           <div className='comment-des'>
                              <p>{comment.description}</p>
                           </div>

                        </div>
                    </div>
                )
            })
        ) : (
            <div className="center">Comments on their way</div>
        )

        return (

            <div className="container home">

                <h4 className="center donde">COMMENTS:</h4>
                <div className= 'catalogo'>
                {commentsList}
                </div>

              <div className = 'container formulario'>
                <form onSubmit={this.handleSubmit} >
                <input name= 'itinerario' type='text' className="text-input" onChange = {this.handleChangeItin} value={this.state.itinerary} placeholder="What itinerary are you commenting on?" />
                <input name= 'descripción' type='text' className="text-input" onChange = {this.handleChangeDescription} value={this.state.description} placeholder="Speak it out, pal!" />
                <div>
                <button className = 'btn waves-effect waves-light' > Say it!</button>
                </div>
                </form>
              </div>
              </div>



        )

    }

}

Comments.defaultProps = {

  itin: []
}


const mapStateToProps = (state, ownProps) => {
  let itin = ownProps.itin;

  console.log ('ownProps', ownProps);
  console.log('name', itin);
  return {
    users: state.user.users,
    itinerary: state.itinerary.itineraries.find( itinerary => itinerary.name == itin.name),
    comments: state.itinerary.comments
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    getUserByToken: (user) => {dispatch(getUserByToken())},
    getComments: () => {dispatch(getComments())},
    getCommentsByItin: (itin) => { dispatch(getCommentsByItin(itin))},
    addComment: (user, comment) => {dispatch(addComment(user, comment))}
  }
}



export default connect( mapStateToProps, mapDispatchToProps)(Comments)
