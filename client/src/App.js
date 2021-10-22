import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import Events from './components/Events/Events';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }
componentDidMount() {

}
loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
    {withCredentials: true})    
.then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  
handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    localStorage.setItem('user', data.user.id)
  }
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
    localStorage.removeItem('user')
  }

  render() {

    return (
      <div>
         
         <BrowserRouter>
          <Switch>
          {localStorage.getItem('user') ? <Main loggout={this.handleLogout}  /> : console.log('') }
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>  
            <Route exact path='/main' component={Main}/>
            <Route exact path='/create_event' component={Events}/>
          </Switch> 
        </BrowserRouter>
      </div>
    );
  }
}
export default App;