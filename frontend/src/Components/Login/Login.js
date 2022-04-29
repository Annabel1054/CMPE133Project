import NavBar from "../Navbar/Navbar";
import { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import './Login.css';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Email: " + email);
        console.log("Password: " + password);
    }
    return (   
        <div class = "background">
             <NavBar/>
            <div class = "loginbox">
                Login
            <Form className='formContainer' onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label >
                            Account E-mail: 
                        </Form.Label>
                        <Form.Control
                            input type='text'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter E-mail"
                        />
                    </Form.Group>
                    <Form.Group className= "input">
                        <Form.Label>
                            Password: 
                        </Form.Label>
                        <Form.Control
                            input type='password'
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