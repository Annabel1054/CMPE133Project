import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import TextbookListing from "../TextbookListing/TextbookListing";
import React, { useEffect } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl, Button, Form } from 'react-bootstrap';
import './styles.css';

/*
    Main Search Page
*/
export default function FindTextbooks() {
    const [searchBy, setSearchBy] = React.useState('Textbook Title');
    const [result, setResult] = React.useState('');
    const [searchedListings, setSearchedListings] = React.useState({
        textbooks: {}
    });
    const [originalListings, setOriginalListings] = React.useState();
    const email = localStorage.getItem('email');

    // We first retrieve all available textbooks from the backend.
    useEffect(() => {
        let searchCriteria = {
            filterType: searchBy,
            entry: '',
        }

        fetch("http://127.0.0.1:5000/find_listings", {
            method: 'POST',
            body: JSON.stringify(searchCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    return data.json();
                }
            }).then(data => {
                setOriginalListings(data);
                setSearchedListings(data);
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }, [])

    // When user inputs a value into the search bar, retrieve textbooks with specified attributes. 
    const searchListings = (e) => {
        e.preventDefault();

        // This is where we will call the textbook listings api to fetch textbooks.
        console.log(searchBy);
        console.log(result);

        let searchCriteria = {
            filterType: searchBy,
            entry: result,
        }

        fetch("http://127.0.0.1:5000/find_listings", {
            method: 'POST',
            body: JSON.stringify(searchCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    return data.json();
                }
            }).then(data => {
                console.log(data);
                setSearchedListings(data);
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
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
                <Form onSubmit={(e) => { searchListings(e) }} >
                    <FormControl className="inputBox" placeholder={"Enter " + searchBy} required onChange={(event) => { setResult(event.target.value) }} value={result} />
                    <Button className="goButton" type="submit">
                        Go
                    </Button>
                </Form>

            </InputGroup>

            {(Object.keys(searchedListings.textbooks).length === 0) ? (
                <p className="noTextbookMessage"> No Textbooks Found </p>
            ) : (
                searchedListings.textbooks.map((listing) => (
                    <TextbookListing
                        title={listing.title}
                        author={listing.author}
                        isbn={listing.isbn}
                        quality={listing.quality}
                        course={listing.courseName}
                        description={listing.description}
                        price={listing.price}
                        originalPrice={listing.originalPrice}
                        id={listing.id}
                        name={listing.firstName + " " + listing.lastName}
                        email={listing.email}
                        phoneNum={listing.phoneNum}
                        image={listing.imgUrl}
                    />
                ))
            )}
        </div >
    );
};