import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import TextbookListing from "../TextbookListing/TextbookListing";
import React, { useEffect } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import './styles.css';

export default function FindTextbooks() {
    const [searchBy, setSearchBy] = React.useState('Textbook Title');
    const [result, setResult] = React.useState('');
    const [searchedListings, setSearchedListings] = React.useState('');
    const [originalListings, setOriginalListings] = React.useState('');

    useEffect(() => {
        let searchCriteria = {
            filterType: null,
            entry: null,
        }

        fetch("http://127.0.0.1:5000/find_listings?filterType=undefined&entry=undefined", {
            method: 'GET',
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
                console.log(data)
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }, [])

    const searchListings = () => {
        // This is where we will call the textbook listings api to fetch textbooks.
        console.log(searchBy);
        console.log(result);

        let searchCriteria = {
            filterType: searchBy,
            entry: result,
        }

        fetch("http://127.0.0.1:5000/find_listings", {
            method: 'GET',
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