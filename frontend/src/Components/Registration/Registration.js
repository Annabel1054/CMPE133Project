
import NavBar from "../Navbar/Navbar";
import './Registration.css';
import { useState } from 'react';
import { Container, Form, Button,Row } from 'react-bootstrap';
import { validEmail } from './RegExp.js';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const validate = () => {
        if (!validEmail.test(email)) {
           setEmailErr(true);
        }
    }
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
   
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reenterdpasssword, setReEnterdPassword] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        console.log("FirstName: " + firstname);
        console.log("LastName: " + lastname);
        console.log("Email: " + email);
        console.log("Phone: " + phone);
        console.log("Password: " + password);
        console.log("ReEnter: " + reenterdpasssword);
        // Add a POST method to backend to create user.
    }
    return (
        <div>
            <NavBar />
            <Container className="subcontainer">
                <br />
                <h2 id="content">Create Your Account</h2>
                <br />
                <Form className='form' onSubmit={onSubmit}>
                <Row className='row'>
                    <Form.Group className="col-md-4" controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='First Name' />
                    </Form.Group>

                    <Form.Group className="col-md-4" controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' value={lastname} onChange={e => setLastname(e.target.value)} placeholder='Last Name' />
                    </Form.Group>

                    <Form.Group className="col-md-4" controlId='userEmail'>
                        <Form.Label>School Email</Form.Label>
                        <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='School Email' />
                    </Form.Group>

                    </Row>
                    <Row className='row'>
                    <Form.Group className="col-md-4" controlId='userPhone'>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type='text' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Contact Number' />
                    </Form.Group>

                    <Form.Group className="col-md-4" controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    </Form.Group>

                    <Form.Group className="col-md-4" controlId='confirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' vlaue={reenterdpasssword} onChange={e => setReEnterdPassword(e.target.value)} placeholder='Confirm Password' />
                    </Form.Group>
                    </Row>
                    <br />
                    <Form.Group >
                        <Button onClick={validate} className="regbtn" type='submit'> <b>Create Account</b></Button>
                    </Form.Group>
                    {emailErr && <p className="error">Your email is invalid, please enter SJSU email.</p>}
                </Form>
                <br />
            </Container>
        </div >
    );
};