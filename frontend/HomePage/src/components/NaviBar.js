import React from 'react'
import {Navbar, Nav,Container,NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import './NaviBar.css'

const NaviBar = () => {
  return (
    <div>
      <>
      <Navbar bg="light" expand="lg">
  <Container fluid className='NavContainer'>
    <Navbar.Brand id ='bookCycle' href="#">BookCycle</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll id='all3'
      >
        <Nav.Link id = 'home' href="#action1">Home</Nav.Link>
        <Nav.Link id = 'login' href="#action2">Login</Nav.Link>
       
        <Nav.Link id = 'register' href="#"> Register</Nav.Link>
        <Nav.Link id = 'contactus' href="#"> About Us</Nav.Link>
      </Nav>
      <Form className="d-flex" id ='seracbox'>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button id = 'searchbutton'variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
    </div>
  )
}

export default NaviBar
