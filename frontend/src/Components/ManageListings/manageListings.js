import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Listing from "./listing";

export default function ManageListings() {

    const [listings, setListings] = useState({
        textbooks: {}
    });

    const email = localStorage.getItem('email');

    useEffect(() => {
        if (email !== undefined) {
            let userEmail = {
                email: email
            }

            fetch("http://127.0.0.1:5000/manage_listings", {
                method: 'POST',
                body: JSON.stringify(userEmail),
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
                    setListings(data);
                })
                .catch(function (error) {
                    console.log("Fetch error: " + error);
                });
        }
    }, [])

    return (
        <div>
            <LoggedInNavBar />
            <div className="editListingHeader">Manage Listings</div>
            {(Object.keys(listings.textbooks).length === 0) ? (
                <p className="noTextbookMessage">You do not have any listings to manage. </p>
            ) : (
                listings.textbooks.map((listing) => (
                    <Listing
                        title={listing.title}
                        author={listing.author}
                        isbn={listing.isbn}
                        quality={listing.quality}
                        course={listing.courseName}
                        description={listing.description}
                        price={listing.price}
                        originalPrice={listing.originalPrice}
                        id={listing.id}
                        email={email}
                        buyers={listing.buyers}
                    />
                ))
            )}
        </div >
    );
};