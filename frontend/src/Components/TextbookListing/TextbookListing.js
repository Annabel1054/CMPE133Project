import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './styles.css';

export default function TextbookListing(props) {
    const { title, isbn, author, price, quality, description, course, name, originalPrice } = props;

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
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Card.Text className="sellerName">{name}</Card.Text>

                    <div>
                        <Card.Text className="oldPrice">Original ${originalPrice}</Card.Text>
                        <Card.Text className="price">${price}</Card.Text>
                        <Button className="addToWatchlist" style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Add to Watchlist</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}