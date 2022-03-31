import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './NaviBar';
import Footer from './Footer';
import pic7 from './images/pic7.jpg';
import './Home.css'


const Home = () => {
  return (
    <div>
      <div className="page-container">
      <NaviBar/>
      <div className="content-wrap">
       <img src={pic7} alt ="us1" className='img-fluid' />
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default Home
