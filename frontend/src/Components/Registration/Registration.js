
import NavBar from "../Navbar/Navbar";
import './Registration.css';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function SignUpPage() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
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
                <h1 id="content">Create Your Account</h1>
                <br />
                <Form className='form' onSubmit={onSubmit}>
                    <Form.Group className="inputSty" controlId='firstName'>
                        <Form.Control type='text' value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='First Name' />
                    </Form.Group>

                    <Form.Group className="inputSty" controlId='lastName'>
                        <Form.Control type='text' value={lastname} onChange={e => setLastname(e.target.value)} placeholder='Last Name' />
                    </Form.Group>

                    <Form.Group className="inputSty" controlId='userEmail'>
                        <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='School Email' />
                    </Form.Group>

                    <Form.Group className="inputSty" controlId='userPhone'>
                        <Form.Control type='text' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Contact Number' />
                    </Form.Group>

                    <Form.Group className="inputSty" controlId='password'>
                        <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    </Form.Group>

                    <Form.Group className="inputSty" controlId='confirm'>
                        <Form.Control type='password' vlaue={reenterdpasssword} onChange={e => setReEnterdPassword(e.target.value)} placeholder='Confirm Password' />
                    </Form.Group>
                    <br />
                    <Form.Group >
                        <Button className="regbtn" type='submit'> <b>Create Account</b></Button>
                    </Form.Group>
                </Form>
                <br />
            </Container>
        </div >
    );
};