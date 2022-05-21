import NavBar from "../Navbar/Navbar";
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

/*
    Login Page
*/
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // On submit, send the user's credentials to the backend and see if the credentials given are valid.
    // If the password and email are correct, user will be logged in.
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Email: " + email);
        console.log("Password: " + password);

        let userData = {
            email: email,
            password: password,
        }

        fetch("http://127.0.0.1:5000/login_user", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Error: Please make sure you entered the correct email and password.")
                else {
                    console.log("Successfully logged in!");
                    localStorage.setItem("email", email);
                    window.location.replace("/findTextbooks");
                }
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
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
                            required
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
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="login_button">Login</Button>
                </Form>
            </div>
        </div >
    );
};