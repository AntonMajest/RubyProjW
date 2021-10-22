import React, { Component } from 'react'
import axios from 'axios'
import Events from '../Events/Events'
import EventsEdit from '../Events/EventsEdit/EventsEdit';
import './Main.css'
export default class Main extends Component {
    constructor(props){     
        super(props);
        this.state = {
            events: [],
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentDidMount(){
     this.getPosts()
    }
    
getPosts = () => {
      axios.get(`http://localhost:3001/eventsall/${localStorage.getItem('user')}/${localStorage.getItem('user')}`, 
        {withCredentials: true})    
    .then(response => {
         this.setState({
              events: response.data.event
          })
        })
        .catch(error => console.log('api errors:', error))
      }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/logout')
    }
    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
      
    render() {  
       
        // let {log} = this.props.loggout
        console.log(this.state.events)
        return (
            <div>
                <div className={'all-event'}>
                <Events getPosts={this.getPosts}/>
                </div>
                <button onClick={this.props.loggout}>Log out</button>
                <div className={'event-wrap'}>
                {(this.state.events.map((item,index) => {
                    return <>
                    <EventsEdit key={index} item={item} getPosts={this.getPosts}/>
                    </>
                }))}
                </div>
            </div>
        )
    }
}
