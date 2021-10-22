import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <div className={'home-wrapper'}>
     
      <Link to='/login' className={'home-links'}>Log In</Link>
     
      <Link to='/signup' className={'home-links'}>Sign Up</Link>
    </div>
  );
};
export default Home;