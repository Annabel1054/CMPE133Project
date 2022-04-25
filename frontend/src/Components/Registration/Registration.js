
import NavBar from "../Navbar/Navbar";
import '../Registration/Registration.css';
import { Container, Form, Button } from 'react-bootstrap'

export default function SignUpPage() {
    

    return (
        <div>
            <NavBar />
            <Container className="subcontainer">
              <br />
             <h1 id="content">Create Your Account</h1>
             <br />
        <Form id='registration'>
             <Form.Group className="inputSty" controlId='firstName'>
             <Form.Control type='text' placeholder='First Name'/>
             </Form.Group>

            <Form.Group className="inputSty"  controlId='lastName'>
            <Form.Control type='text' placeholder='Last Name'/>
            </Form.Group>

            <Form.Group className="inputSty"  controlId='userEmail'>
            <Form.Control type='email'placeholder='School Email'/>
            </Form.Group>

            <Form.Group className="inputSty"  controlId='userPhone'>
            <Form.Control type='text' placeholder='Contact Number'/>
            </Form.Group>

            <Form.Group className="inputSty"  controlId='password'>
            <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group className="inputSty" controlId='confirm'>
            <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>
            <br />
            <Form.Group >
            <Button className ="regbtn" type='submit' > <b>Create Account</b></Button>
            </Form.Group>
      </Form> 
             <br />

            
             
            </Container>
        </div >
    );
};