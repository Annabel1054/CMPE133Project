import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './WatchlistStyles.css';

export default function WatchlistListing(props) {
    const { title, isbn, author, price, quality, description, course, name } = props;

    return (
        <div className="listingContainer">
            <Card style={{ width: '80%' }}>
                <Card.Img src={calculusImage} />
                <Card.Body>
                    <Card.Title>{title}, {author}</Card.Title>
                    <Card.Text>ISBN: {isbn}</Card.Text>
                    <Card.Text>Quality: {quality}</Card.Text>
                    <Card.Text>Course: {course}</Card.Text>
                    <Card.Text>
                        {description} Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Card.Text className="sellerName">{name}</Card.Text>
                    <div>
                        <Card.Text className="price">${price}</Card.Text>
                        <Button style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Contact Seller</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}