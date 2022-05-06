import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg";
import './styles.css';
import WatchlistListing from "./WatchlistListing";


export default function Watchlist() {
    
    return (
        <div className="maindiv">
            <LoggedInNavBar />
            
            <WatchlistListing
                title="Calculus"
                author="Larson Hostetler Edwards"
                isbn="9809238423"
                quality="9"
                course="MATH31"
                description="This textbook is new."
                price="87"
                name="John Doe"
            />
            </div>
          
        
    );
};