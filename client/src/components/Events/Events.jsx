import React, { Component } from 'react';
import axios from 'axios'
import './Events.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        title: '',
        desc: '',
        time: '',
        errors: ''
     };
  }
handleChange = (ev) => {
    const {name, value} = ev.target
    this.setState({
      [name]: value
    })
  };
  handleSubmit = (ev) => {
    ev.preventDefault()
    const {title, desc, time} = this.state
    let event = {
        title: title,
        desc: desc,
        time: time,
        user_id: localStorage.getItem('user')
    }
axios.post(`http://localhost:3001/users/${localStorage.getItem('user')}/event`, {event}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.getPosts()
       } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => toast(`api errors:${error}`  ,))
  };

handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
        </ul> 
      </div>
    )
  };
render() {
    const  {title, desc, time}  = this.state

return (
      <div>
        <h1 className={'form-title'}>Event Form</h1>        
<form onSubmit={this.handleSubmit} className={'form'}>
  <div className={'form-input'}>
  <input
            placeholder="title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            placeholder="desc"
            type="text"
            name="desc"
            value={desc}
            onChange={this.handleChange}
          />
  </div>
         <div className={'form-input_date-confirm'}>
         <input 
            placeholder="time"
            type="time"
            name="time"
            value={time}
            onChange={this.handleChange}
          />                
          <button placeholder="submit" type="submit">
            Create event
          </button>
         </div>
     
      
        </form>
        <ToastContainer />
      </div>
    );
  }
}
export default Events;