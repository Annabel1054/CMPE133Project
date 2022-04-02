import { useState } from 'react';
import { Button, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import './styles.css';

export default function ListingForm() {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
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
        // Add a POST method to backend to submit textbook listing.
    }

    return (
        <div>
            <Form className='formContainer' onSubmit={onSubmit}>
                <Row>
                    <Form.Group className="col-md-6">
                        <Form.Label>Textbook Title</Form.Label>
                        <Form.Control
                            id="textbookTitle"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter the textbook title"
                        />
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            id="isbn"
                            placeholder="Enter ISBN"
                            value={isbn}
                            onChange={e => setIsbn(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="col-md-6">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            id="price"
                            placeholder="$15.00"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl type="number" />
                    </InputGroup>
                    <Form.Group className="col-md-6">
                        <Form.Label>Quality</Form.Label>
                        <Form.Control
                            type="number"
                            id="quality"
                            placeholder="Enter Quality"
                            value={quality}
                            onChange={e => setQuality(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="col-md-6">
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
                <Row>
                    <Form.Group>
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
                </Row>
                <Button type="submit">Submit</Button>
            </Form>
        </div >
    );
};