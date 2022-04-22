import React, { useState, useEffect } from 'react';
import NavBar from './Components/Navbar/Navbar';

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
      <NavBar />
      <div>CMPE133 Project HOME PAGE</div>
      {(typeof data.members === 'undefined') ? (
        <p> loading ... </p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  );
}

export default App;
