import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import './styles.css';

export default function NavBarLoggedIn() {
    return (
        <Navbar className="navbar-background" variant="dark">
            <Container>
                <Navbar.Brand href="/">SJSU BookCycle</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link href="/findTextbooks">Find Textbooks</Nav.Link>
                        <Nav.Link href="/manageListings">Manage Listings</Nav.Link>
                        <Nav.Link href="/listingForm">Create Listing</Nav.Link>
                        <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}