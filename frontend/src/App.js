import React, { useState, useEffect } from 'react';
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
      <div>CMPE133 Project</div>
      {(typeof data.members === 'undefined') ? (
        <p> loading ... </p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
      <Home />
    </div>
  );
}

export default App;
