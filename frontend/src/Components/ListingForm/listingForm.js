import { useState } from 'react';
import { Button, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import './styles.css';
import NavBarLoggedIn from '../Navbar/LoggedInNavbar';

/*
    Create Listing Page
*/
export default function ListingForm() {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [course, setCourse] = useState('');
    const [quality, setQuality] = useState('Excellent');
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const [price, setPrice] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [description, setDescription] = useState('');

    const email = localStorage.getItem('email');

    // Save the image file and image name inside variables.
    const printImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.value);
    }

    // On submit, save user's textbook listing into the database.
    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', image);

        console.log("Textbook title: " + title);
        console.log("ISBN: " + isbn);
        console.log("Quality: " + quality);
        console.log("Image: " + data);
        console.log("Price: " + price);
        console.log("Original Price: " + originalPrice);
        console.log("Description: " + description);
        console.log("Author Name: " + author);
        console.log("Course Name: " + course);

        let listingData = {
            title: title,
            author: author,
            isbn: isbn,
            price: price,
            originalPrice: originalPrice,
            course: course,
            imageName: image.name,
            email: email,
            description: description,
            quality: quality,
        }

        // Save inputted image in the database.
        fetch("http://127.0.0.1:5000/save_image", {
            method: 'POST',
            body: data,
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    console.log("Successfully uploaded image!");
                    return data.json()
                }
            }).then((data) => {
                console.log(data)
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });

        // Save textbook listing data into the database.
        fetch("http://127.0.0.1:5000/create_new_listing", {
            method: 'POST',
            body: JSON.stringify(listingData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    console.log("Your textbook listing was successfully created!");
                    window.location.replace("/manageListings");
                }
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
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
                                required
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
                                required
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                id="isbn"
                                placeholder="Enter ISBN"
                                value={isbn}
                                required
                                onChange={e => setIsbn(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-2">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <FormControl
                                    type="number"
                                    id="price"
                                    required
                                    placeholder="15.00"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-2">
                            <Form.Label>Original Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <FormControl
                                    type="number"
                                    id="originalPrice"
                                    placeholder="35.00"
                                    required
                                    value={originalPrice}
                                    onChange={e => setOriginalPrice(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                id="course"
                                placeholder="Ex: CS46A"
                                value={course}
                                required
                                onChange={e => setCourse(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Textbook Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                id="textbookImage"
                                required
                                value={imageName}
                                onChange={e => printImage(e)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-8">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                id="description"
                                placeholder="Tell us about your book."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Quality</Form.Label>
                            <Form.Select onChange={e => setQuality(e.target.value)} aria-label="Default select example">
                                <option value="Excellent">Excellent</option>
                                <option value="Great">Great</option>
                                <option value="Okay">Okay</option>
                                <option value="Not Great">Not Great</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button className="submitButton" type="submit">Submit Textbook</Button>
                </Form>
            </div>
        </div >
    );
};