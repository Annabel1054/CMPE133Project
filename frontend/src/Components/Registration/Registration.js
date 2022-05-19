
import NavBar from "../Navbar/Navbar";
import './Registration.css';
import { useState } from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { validEmail } from './RegExp.js';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const validate = (e) => {
        e.preventDefault();
        let valid = true;
        setEmailErr(false);
        setPasswordErr(false);

        if (!validEmail.test(email)) {
            setEmailErr(true);
            valid = false;
        }

        if (password !== reenterdpasssword) {
            setPasswordErr(true);
            valid = false;
        }

        if (valid === true) {
            onSubmit(e);
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

        let userData = {
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            phoneNum: phone,
        }

        if (password === reenterdpasssword) {
            fetch("http://127.0.0.1:5000/register_user", {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(data => {
                    if (data.status !== 200)
                        alert("Having error")
                    else {
                        alert("Your account was successfully created!");
                        window.location.replace("/login");
                    }
                })
                .catch(function (error) {
                    console.log("Fetch error: " + error);
                });
        } else {
            console.log("Please make sure your passwords are matching.")
        }
    }
    return (
        <div>
            <NavBar />
            <Container className="subcontainer">
                <br />
                <h2 id="content">Create Your Account</h2>
                <br />
                <Form className='form' onSubmit={validate}>
                    <Row className='row'>
                        <Form.Group className="col-md-4" controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' required value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='First Name' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' required value={lastname} onChange={e => setLastname(e.target.value)} placeholder='Last Name' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='userEmail'>
                            <Form.Label>School Email</Form.Label>
                            <Form.Control type='email' required value={email} onChange={e => setEmail(e.target.value)} placeholder='School Email' />
                        </Form.Group>

                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-4" controlId='userPhone'>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type='text' required value={phone} onChange={e => setPhone(e.target.value)} placeholder='Contact Number' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' required value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' required value={reenterdpasssword} onChange={e => setReEnterdPassword(e.target.value)} placeholder='Confirm Password' />
                        </Form.Group>
                    </Row>
                    <br />
                    <Form.Group className="regbtngroup">
                        <Button className="regbtn" type='submit'> <b>Create Account</b></Button>
                    </Form.Group>
                    {emailErr && <p className="error">Your email is invalid, please enter a SJSU email.</p>}
                    {passwordErr && <p className="error">Please make sure your passwords are matching.</p>}
                </Form>
                <br />
            </Container>
        </div >
    );
};