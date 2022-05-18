import LoggedInNavBar from "../Navbar/LoggedInNavbar";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function ManageListings() {

    let title = "MY TITLE";
    let originalPrice = 100;
    let price = 50;
    let author = "Sammy Portugese";
    let course = "ENG20";
    let quality = "Excellent";
    let description = "THIS IS THE DESCRIPTION OF MY BOOK";
    let isbn = "12128736187264"

    const email = localStorage.getItem('email');

    const history = useHistory();
    const editClick = () => {
        history.push('/editListing', {
            title, originalPrice, price, author, course, quality, description, isbn
        });
    };

    useEffect(() => {
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
                    console.log("Successfully grabbed user's listings!");
                }
            }).then(data => {
                console.log(data);
            })
            .catch(function (error) {
                console.log("Fetch error: " + error);
            });
    }, [])

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