import { Container, Button, Card, Text } from "react-bootstrap";
import './styles.css';
import { useHistory, useLocation } from "react-router-dom";

/*
    Textbook Listing Component that will be rendered in Manage Listings Page.
*/
export default function Listing(props) {
    const { title, isbn, author, price, quality, description, course, originalPrice, id, email, buyers, image } = props;

    // Store buyer information strings into an array so that frontend can easily render it.
    let buyerStrings = []
    buyers.map((buyer, i) => {
        buyerStrings[i] = buyer.buyerEmail
    })

    const history = useHistory();

    // User will be rerouted to edit listing page when they press "Edit Textbook"
    // The following variables below will be passed into the edit listing page.
    const editClick = () => {
        history.push('/editListing', {
            id, title, originalPrice, price, author, course, quality, description, isbn, email, image
        });
    };

    // When user marks listing as sold, we will update "available" to false (0) in the database.
    const markAsSold = () => {
        let listing = {
            id: id,
            title: title,
            author: author,
            isbn: isbn,
            price: price,
            originalPrice: originalPrice,
            course: course,
            imageName: 'sold',
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
                <Card.Img src={'http://127.0.0.1:5000' + image} />
                <Card.Body>
                    <Card.Title>{title}, {author}</Card.Title>
                    <Card.Text>ISBN: {isbn}</Card.Text>
                    <Card.Text>Quality: {quality}</Card.Text>
                    <Card.Text>Course: {course}</Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        {buyers.length != 0 && (
                            <p> Interested Buyers: </p>
                        )}
                        {buyers.map((buyer) => (
                            <p>{buyer.buyerFirstName} {buyer.buyerLastName} | {buyer.buyerEmail} | ({buyer.buyerPhoneNum.substring(0, 3)}){buyer.buyerPhoneNum.substring(3, 6)}-{buyer.buyerPhoneNum.substring(6, 10)}</p>
                        ))}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="rightSection">
                    <Card.Text className="sellerName">Interested Buyers: {buyers.length}</Card.Text>
                    <div>
                        <Card.Text className="sellerName">Original: ${originalPrice}</Card.Text>
                        <Card.Text className="price">${price}</Card.Text>
                    </div>
                    <Button className='listingButtons' onClick={editClick} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Edit Listing</Button>
                    <Button className='listingButtons' onClick={markAsSold} style={{ width: '150px', backgroundColor: '#829A7E' }} variant="primary">Mark as Sold</Button>
                </Card.Body>
            </Card>
        </div >
    );
}