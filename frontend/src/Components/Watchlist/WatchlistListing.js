import { Container, Button, Card, Text, Modal } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './WatchlistStyles.css';
import { AiOutlineBorderRight, AiOutlineClose } from 'react-icons/ai';
import Popup from "./Popup";
import { useState } from "react";



export default function WatchlistListing(props) {
    const { title, isbn, author, price, oldPrice, quality, description, course, name, phoneNum, sellerEmail, id } = props;

    const [buttonpopup, setbuttonpopup] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const email = localStorage.getItem('email');

    const removeListing = () => {

        let removeData = {
            email: email,
            textbookId: id,
        }

        fetch("http://127.0.0.1:5000/remove_from_watchlist", {
            method: 'POST',
            body: JSON.stringify(removeData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    return data.json();
                }
            }).then(data => {
                alert('Successfully Removed Listing From Your Watchlist!');
                window.location.replace("/watchlist");
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }

    return (
        <div className="listingContainer">
            <Card style={{ width: '80%' }}>
                <Card.Img src={calculusImage} />
                <Card.Body>
                    <Card.Title>{title}, {author}  </Card.Title>

                    <Card.Text>ISBN: {isbn}</Card.Text>
                    <Card.Text>Quality: {quality}</Card.Text>
                    <Card.Text>Course: {course}</Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Button className="closeButton" onClick={removeListing}><AiOutlineClose /></Button>
                    <div>
                        <Card.Text className="oldPrice">Original ${oldPrice}</Card.Text>
                        <Card.Text className="sellingPrice">${price}</Card.Text>
                        <Button className="contact" style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary" onClick={() => handleShow()}>Contact Seller</Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact the seller to purchase '{title}' </Modal.Title>
                </Modal.Header>
                <Modal.Body>Seller Name: {name}</Modal.Body>
                <Modal.Body>Contact Number: ({phoneNum.substring(0, 3)}){phoneNum.substring(3, 6)}-{phoneNum.substring(6, 10)}</Modal.Body>
                <Modal.Body>Contact Email: {sellerEmail}</Modal.Body>
            </Modal>
        </div>
    );
}


{/* <Popup trigger={buttonpopup} setTrigger={setbuttonpopup}
                title="Calculus"
                name="John Doe"
                contactnum="5852651284"
                email='johndoe@sjsu.edu'
                author="Larson Hostetler Edwards"> </Popup> */}