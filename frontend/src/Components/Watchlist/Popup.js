import React from 'react'
import { Card } from 'react-bootstrap';
import "./Popup.css";
import { AiOutlineClose } from 'react-icons/ai';

/* 
  Popup component that is used to show seller's contact information.
  (Is not used in the website)
*/
const Popup = (props) => {
  const { title, name, email, contactnum, author, } = props;

  return (props.trigger) ? (
    <div className='popup'>


      <Card style={{ width: '100%', height: '100%', backgroundColor: '#5F7D5A' }}>

        <br />
        <Card.Title>
          <button className='close' onClick={() => props.setTrigger(false)}> <AiOutlineClose /> </button>
        </Card.Title>
        <br />
        <Card.Title style={{ fontSize: '32px', color: '#FFFF' }}>
          Contact the Seller to purchase: {title} {author}
          <br />
          <br />
          <div style={{ marginLeft: '20px', marginTop: '20px', fontSize: '22px', color: '#FFFF' }}>
            Seller Name: {name}
            <br />
            <br />
            Contact Number: {contactnum}
            <br />
            <br />
            Contact Email:{email}
            <br />
            <br />
          </div>
        </Card.Title>
        <br />
      </Card>
    </div>


  ) : '';
}


export default Popup
