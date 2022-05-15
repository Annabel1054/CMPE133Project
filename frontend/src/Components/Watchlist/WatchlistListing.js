import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './WatchlistStyles.css';
import { AiOutlineClose } from 'react-icons/ai';
import Popup from "./Popup";
import { useState } from "react";



export default function WatchlistListing(props) {
    const { title, isbn, author, price, oldPrice, quality, description, course, name } = props;

    const[buttonpopup, setbuttonpopup] = useState(false);

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
                        {description} Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Button className="sellerName"><AiOutlineClose/></Button>
                    
                    <div>
                        <Card.Text className="oldPrice">Original ${oldPrice}</Card.Text>
                        <Card.Text className="price">${price}</Card.Text>
                        <Button className="contact" style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary" onClick={()=> setbuttonpopup(true)}>Contact Seller</Button>
                        
                    </div>


                </Card.Body>
            </Card>
            <Popup trigger={buttonpopup} setTrigger= {setbuttonpopup}
            title="Calculus"
            name="John Doe"
            contactnum="5852651284"
            email ='johndoe@sjsu.edu'
            author="Larson Hostetler Edwards"> </Popup>
        </div>
    );
}