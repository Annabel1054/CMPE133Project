import NavBar from "../Navbar/Navbar";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Homepage/Footer';
import pic7 from '../Images/pic7.jpg';
import '../Homepage/Home.css';


const Home = () => {
  return (
    <div className="page-container">
      <NavBar />
      <div className="home">
        <img src={pic7} className='img-fluid' />
        <div className="content">
          <p ><h1 id="wordings"> If you are an SJSU student looking for cheaper textbook alternatives, look no further!</h1>
            <h1>BookCycle is a place where you can sell or buy used textbooks.</h1></p>
        </div>

        <Footer />
      </div>

    </div>
  )
}

export default Home