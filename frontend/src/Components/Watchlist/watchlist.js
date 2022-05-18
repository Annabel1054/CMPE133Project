import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Container, Button, Card, Text } from "react-bootstrap";
import calculusImage from "./Calculus Textbook.jpg";
import "./WatchlistStyles.css";
import WatchlistListing from "./WatchlistListing";
import React, { useEffect, useState } from 'react';


export default function WatchList() {
    const [watchlistListings, setWatclistListings] = useState([]);
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
                    setWatclistListings(data);
                })
                .catch(function (error) {
                    console.log("Fetch error: " + error);
                });
        }
    }, [])


    return (
        <div className="maindiv">
            <LoggedInNavBar />

            <div className="watchlistContainer">
                <div className="watchlistHeader">Your Watchlist</div>
                {(typeof watchlistListings.textbooks === 'undefined') ? (
                    <p> No Textbooks In Watchlist! Start Searching :) </p>
                ) : (
                    watchlistListings.textbooks.map((listing) => (
                        <WatchlistListing
                            title={listing.title}
                            author={listing.author}
                            isbn={listing.isbn}
                            quality={listing.quality}
                            course={listing.courseName}
                            description={listing.description}
                            price={listing.price}
                            oldPrice={listing.originalPrice}
                            id={listing.id}
                            email={listing.email}
                        />
                    ))
                )}
            </div>


        </div>


    );
};