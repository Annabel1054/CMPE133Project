import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg"
import './styles.css';
import { useHistory, useLocation } from "react-router-dom";

export default function Listing(props) {
    const { title, isbn, author, price, quality, description, course, originalPrice, id, email } = props;

    const history = useHistory();

    const editClick = () => {
        history.push('/editListing', {
            id, title, originalPrice, price, author, course, quality, description, isbn, email
        });
    };

    const markAsSold = () => {
        let listing = {
            id: id,
            title: title,
            author: author,
            isbn: isbn,
            price: price,
            originalPrice: originalPrice,
            course: course,
            // file: image,
            email: email,
            description: description,
            quality: quality,
            available: 0, // mark available as false
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
                    alert("Your textbook has successfully been marked as sold!")
                    window.location.replace("/manageListings");
                }
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
                    <Card.Title>{title}, {author}</Card.Title>
                    <Card.Text>ISBN: {isbn}</Card.Text>
                    <Card.Text>Quality: {quality}</Card.Text>
                    <Card.Text>Course: {course}</Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        INTERESTED BUYERS:
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Card.Text className="sellerName">Original: ${originalPrice}</Card.Text>
                    <div>
                        <Card.Text className="price">${price}</Card.Text>

                    </div>
                    <Button className='listingButtons' onClick={editClick} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Edit Listing</Button>
                    <Button className='listingButtons' onClick={markAsSold} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Mark as Sold</Button>
                </Card.Body>
            </Card>
        </div>
    );
}