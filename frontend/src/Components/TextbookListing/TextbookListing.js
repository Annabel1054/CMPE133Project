import { Container, Button, Card, Text } from "react-bootstrap";
import './styles.css';

/*
    Textbook Listing Component that is renderd in Main Search Page.
*/
export default function TextbookListing(props) {
    const email = localStorage.getItem('email');
    const { title, isbn, author, price, quality, description, course, name, originalPrice, id, image } = props;

    // When user presses "add to watchlist", save the textbook listing to the user.
    const addToWatchlist = () => {

        let watchlistData = {
            email: email,
            textbookId: id,
        }

        console.log(id);

        fetch("http://127.0.0.1:5000/add_to_watchlist", {
            method: 'POST',
            body: JSON.stringify(watchlistData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    alert("Successfully added this book into your watchlist!")
                }
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }

    return (
        <div className="listingContainer">
            <Card style={{ width: '80%' }}>
                <Card.Img src={"http://127.0.0.1:5000" + image} />
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
                        <Button className="addToWatchlist" onClick={addToWatchlist} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Add to Watchlist</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}