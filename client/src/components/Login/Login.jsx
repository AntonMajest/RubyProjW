import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      errors: {}
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state 
    let user = {
      username: username,
      email: email,
      password: password,
    }
    
axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        localStorage.setItem('user', response.data.user.id)
        window.location.reload()
      } else {
        this.setState({
          errors: response.data.errors
        })
        toast(`${this.state.errors.map(el => el)}`  ,)
      }
    })
    
  };

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };
render() {
    const {username, email, password} = this.state 
    return (
      <div>
        <h1>Log In</h1>        
<form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />         

          <button placeholder="submit" type="submit" >
            Log In
          </button>  
     
        
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
         </form>
      </div>
    );
  }
}
export default Login;