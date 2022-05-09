import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function ManageListings() {

    let title = "MY TITLE";
    let originalPrice = 100;
    let price = 50;
    let author = "Sammy Portugese";
    let course = "ENG20";
    let quality = "Excellent";
    let description = "THIS IS THE DESCRIPTION OF MY BOOK";
    let isbn = "12128736187264"

    const history = useHistory();
    const editClick = () => {
        history.push('/editListing', {
            title, originalPrice, price, author, course, quality, description, isbn
        });
    };

    return (
        <div>
            <LoggedInNavBar />
            <Button
                onClick={editClick}
            >
                Go To Edit Listings Page
            </Button>
            MANAGE LISTINGS PAGE
        </div >
    );
};