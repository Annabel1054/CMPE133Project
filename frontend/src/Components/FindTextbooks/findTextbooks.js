import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import TextbookListing from "../TextbookListing/TextbookListing";
import React from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import './styles.css';

export default function FindTextbooks() {
    const [searchBy, setSearchBy] = React.useState('Textbook Title');
    const [result, setResult] = React.useState('');

    const searchListings = () => {
        // This is where we will call the textbook listings api to fetch textbooks.
        console.log("Search");
        console.log(searchBy);
        console.log(result);
    }

    return (
        <div>
            <LoggedInNavBar />
            <InputGroup className="searchBar">
                <DropdownButton
                    className="dropdownButton"
                    variant="outline-secondary"
                    title={'Search By: ' + searchBy}
                >
                    <Dropdown.Item onClick={(event) => { setSearchBy("Textbook Title") }}>Textbook Title</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(event) => { setSearchBy("ISBN") }}>ISBN</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(event) => { setSearchBy("Course") }}>Course</Dropdown.Item>
                </DropdownButton>
                <FormControl className="inputBox" onChange={(event) => { setResult(event.target.value) }} value={result} />
                <Button className="goButton" onClick={searchListings}>
                    Go
                </Button>
            </InputGroup>


            <TextbookListing
                title="Calculus"
                author="Larson Hostetler Edwards"
                isbn="9809238423"
                quality="9"
                course="MATH31"
                description="This textbook is new."
                price="87"
                name="John Doe"
            />
        </div >
    );
};