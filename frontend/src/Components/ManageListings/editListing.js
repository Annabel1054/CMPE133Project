import { useState } from 'react';
import { Button, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import './styles.css';
import NavBarLoggedIn from '../Navbar/LoggedInNavbar';
import { useHistory, useLocation } from "react-router-dom";

/*
    Edit Listing Page
*/
export default function EditListing() {
    const location = useLocation();

    const [title, setTitle] = useState(location.state.title);
    const [isbn, setIsbn] = useState(location.state.isbn);
    const [author, setAuthor] = useState(location.state.author);
    const [course, setCourse] = useState(location.state.course);
    const [quality, setQuality] = useState(location.state.quality);
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [price, setPrice] = useState(location.state.price);
    const [originalPrice, setOriginalPrice] = useState(location.state.originalPrice);
    const [description, setDescription] = useState(location.state.description);

    // Navigate back to the original Manage Listing Page
    const history = useHistory();
    const navigateToManageListings = () => {
        history.push('/manageListings');
    };

    // Save the image name and image file into variables.
    const printImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.value);
    }

    const email = localStorage.getItem('email');

    // On submit, update the user's textbook listing with the inputted information.
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Textbook title: " + title);
        console.log("ISBN: " + isbn);
        console.log("Quality: " + quality);
        console.log("Image: " + image);
        console.log("Price: " + price);
        console.log("Original Price: " + originalPrice);
        console.log("Description: " + description);
        console.log("Author Name: " + author);
        console.log("Course Name: " + course);

        // If there is no image, send the following data to the backend.
        if (image == '') {
            let listing = {
                id: location.state.id,
                title: title,
                author: author,
                isbn: isbn,
                price: price,
                originalPrice: originalPrice,
                course: course,
                email: location.state.email,
                description: description,
                quality: quality,
                available: 1,
            }

            fetch("http://127.0.0.1:5000/modify_listing", {
                method: 'POST',
                body: JSON.stringify(listing),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    if (data.status !== 200)
                        alert("Having error")
                    else {
                        alert("Successfully updated your textbook listing.")
                        window.location.replace("/manageListings");
                    }
                })
                .catch(function (error) {
                    console.log("Fetch error: " + error);
                });
            // If there is an image, another api call will need to be made in order to save the image.
        } else {
            const data = new FormData();
            data.append('image', image);
            console.log("IMAGE NAME")
            console.log(image.name)

            let listingData = {
                id: location.state.id,
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
                available: 1,
            }

            // Save image in database.
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

            // Update the current textbook listing.
            fetch("http://127.0.0.1:5000/modify_listing", {
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
                        alert("Successfully updated your textbook listing.")
                        window.location.replace("/manageListings");
                    }
                })
                .catch(function (error) {
                    console.log("Fetch error: " + error);
                });
        }
    }

    return (
        <div className="background">
            <NavBarLoggedIn />
            <Button className="backToManageListingsButton" onClick={navigateToManageListings}>
                Back to Manage Listings
            </Button>
            <div className="editListingHeader">Edit Listing</div>
            <div className='formContainer'>
                <div className="instructions">Please fill out this form to advertise your textbook!</div>
                <Form className='form' onSubmit={onSubmit}>
                    <Row className='row'>
                        <Form.Group className="col-md-4">
                            <Form.Label>Textbook Title</Form.Label>
                            <Form.Control
                                id="textbookTitle"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Enter Textbook Title"
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                                id="author"
                                required
                                placeholder="Enter Author Name"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                id="isbn"
                                required
                                placeholder="Enter ISBN"
                                value={isbn}
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
                                    required
                                    placeholder="35.00"
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
                                required
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
                    <Button className="submitButton" type="submit">Update Textbook</Button>
                </Form>
            </div>
        </div >
    );
};