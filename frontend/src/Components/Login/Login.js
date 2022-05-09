import NavBar from "../Navbar/Navbar";
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Email: " + email);
        console.log("Password: " + password);
    }
    return (
        <div className="background">
            <NavBar />
            <div className="loginbox">
                <div className="loginHeader">LOGIN</div>
                <Form className='formContainerLogin' onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label >
                            SJSU Email:
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter SJSU Email"
                        />
                    </Form.Group>
                    <Form.Group className="input">
                        <Form.Label>
                            Password:
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="login_button">Login</Button>
                </Form>
            </div>
        </div >
    );
};