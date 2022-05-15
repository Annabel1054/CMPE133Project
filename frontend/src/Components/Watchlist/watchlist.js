import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg";
import './styles.css';
import WatchlistListing from "./WatchlistListing";


export default function WatchList() {
    
    return (
        <div className="maindiv">
            <LoggedInNavBar />
            
            <WatchlistListing
                title="Calculus"
                author="Larson Hostetler Edwards"
                isbn="9809238423"
                quality="Good"
                course="MATH31"
                description="This textbook is new."
                oldPrice ="100"
                price="87"
                name="John Doe"
            />
            </div>
          
        
    );
};