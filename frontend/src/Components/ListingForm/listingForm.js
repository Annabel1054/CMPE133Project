import { useState } from 'react';
import { Button, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import './styles.css';
import NavBarLoggedIn from '../Navbar/LoggedInNavbar';

export default function ListingForm() {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [course, setCourse] = useState('');
    const [quality, setQuality] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Textbook title: " + title);
        console.log("ISBN: " + isbn);
        console.log("Quality: " + quality);
        console.log("Image: " + image);
        console.log("Price: " + price);
        console.log("Description: " + description);
        console.log("Author Name: " + author);
        console.log("Course Name: " + course);
        // Add a POST method to backend to submit textbook listing.
    }

    return (
        <div className="background">
            <NavBarLoggedIn />
            <div className="header">Create Listing</div>
            <div className='formContainer'>
                <div className="instructions">Please fill out this form to advertise your textbook!</div>
                <Form className='form' onSubmit={onSubmit}>
                    <Row className='row'>
                        <Form.Group className="col-md-4">
                            <Form.Label>Textbook Title</Form.Label>
                            <Form.Control
                                id="textbookTitle"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Enter Textbook Title"
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                                id="author"
                                placeholder="Enter Author Name"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                id="isbn"
                                placeholder="Enter ISBN"
                                value={isbn}
                                onChange={e => setIsbn(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-4">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <FormControl
                                    type="number"
                                    id="price"
                                    placeholder="$15.00"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                id="course"
                                placeholder="Ex: CS46A"
                                value={course}
                                onChange={e => setCourse(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Textbook Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                id="textbookImage"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-8">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                id="description"
                                placeholder="Tell us about your book."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Quality</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    id="quality"
                                    placeholder="Enter Quality"
                                    aria-describedby='qualityBlock'
                                    value={quality}
                                    onChange={e => setQuality(e.target.value)}
                                />
                                <InputGroup.Text>/ 10</InputGroup.Text>
                                <Form.Text id="qualityBlock" muted>
                                    Please enter a number between 1-10.
                                    10 being brand new, 1 being not usable.
                                </Form.Text>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Button className="submitButton" type="submit">Submit Textbook</Button>
                </Form>
            </div>
        </div >
    );
};