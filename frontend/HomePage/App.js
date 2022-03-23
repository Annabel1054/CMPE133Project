
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './components/NaviBar';
import Footer from './components/Footer';
import us2 from './images/us2.jpg';

function App() {
  return (
    <div className="page-container">
      <NaviBar/>
      <div className="content-wrap">
       <img src={us2} alt ="usedbook" className='img-fluid' />
      </div>
     
      <Footer />
    </div>
  );
}

export default App;
