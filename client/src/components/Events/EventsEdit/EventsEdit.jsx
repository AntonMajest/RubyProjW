import React, { Component } from 'react'

import Modal from 'react-modal';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './EventsEdit.css'
export default class EventsEdit extends Component {
    constructor () {
        super();
        this.state = {
          showModal: false,
          title: '',
          desc: '',
          time: '',
          errors: '',
          id: ''
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.delete = this.delete.bind(this)
      }

      handleChange = (ev) => {
        const {name, value} = ev.target
        this.setState({
          [name]: value
        })
      };

      handleOpenModal (id) {
        this.setState({ showModal: true, id:id});
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
        this.props.getPosts()
      }
      delete (ev) {
        ev.preventDefault()
        axios.delete(`http://localhost:3001/eventdelete/${this.state.id}`)
       
      }
      handleSubmit = (ev) => {
        ev.preventDefault()
        const {title, desc, time, id} = this.state
        let event = {
            id:id,
            title: title,
            desc: desc,
            time: time,
        }
      
    axios.put(`http://localhost:3001/eventsupdate/${this.state.id}`, {event},{withCredentials: true} )
    .then(response => {
        if (response) {
          this.props.getPosts()
         } else {
          this.setState({
            errors: response.data.errors
          })
          toast(`${this.state.errors.map(el => el)}`  ,)
        }
      })
      
      };
    
      
      render () {
        const  {title, desc, time}  = this.state
          let item = this.props.item
       

        return (
          <div>
            <div className={'event'}> 
              <Link className={'event__title'} 
                    to={`event/edit/id=${item.id}`} 
                    onClick={() => this.handleOpenModal(item.id)}
                    >
                      {item.title}
              </Link>
    
            </div>
       
            <Modal 
               isOpen={this.state.showModal}
            >
                <div>
                <div>
                    <b>Title: </b>
                    <br/>{item.title}
                </div>
                <div>
                       <b>Description:</b> <br/>{item.desc}
                    </div>
                    <div>
                       <b>Time:</b> <br/>{item.time}
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
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
          <input 
            placeholder="time"
            type="time"
            name="time"
            value={time}
            onChange={this.handleChange}
          />                
          <button placeholder="submit" type="submit" >
            Change event
          </button>
          <button onClick={this.delete}>
              x
            </button>
        </form>
        <ToastContainer />
              <Link to={'/'} onClick={this.handleCloseModal}>Close Modal</Link>
            </Modal>
          </div>
        );
      }
    }


