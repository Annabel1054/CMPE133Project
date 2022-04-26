import React, { useState, useEffect } from 'react';
import NavBar from './Components/Navbar/Navbar';
import Home from './Components/Homepage/Home';

function App() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    )
  }, []);

  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
