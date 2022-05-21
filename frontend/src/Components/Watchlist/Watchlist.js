import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import "./WatchlistStyles.css";
import WatchlistListing from "./WatchlistListing";
import React, { useEffect, useState } from 'react';

/*
    Watchlist Page
*/
export default function WatchList() {
    const [watchlistListings, setWatclistListings] = useState({
        textbooks: {}
    });
    const email = localStorage.getItem('email');

    // Fetch all of the user's interested listings and display it on the page.
    useEffect(() => {
        if (email !== undefined) {
            let userEmail = {
                email: email
            }

            fetch("http://127.0.0.1:5000/get_user_watchlist", {
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
                    console.log(data);
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
                {(Object.keys(watchlistListings.textbooks).length === 0) ? (
                    <p className="noTextbookMessage"> No Textbooks In Watchlist! Start Searching :) </p>
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
                            sellerEmail={listing.email}
                            name={listing.firstName + " " + listing.lastName}
                            phoneNum={listing.phoneNum}
                            image={listing.imgUrl}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
