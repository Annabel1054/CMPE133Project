import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ListingForm from './Components/ListingForm/listingForm';
import LoginPage from './Components/Login/Login';
import SignUpPage from './Components/Registration/Registration';
import FindTextbooks from './Components/FindTextbooks/findTextbooks';
import ManageListings from './Components/ManageListings/manageListings';
import EditListing from './Components/ManageListings/editListing';
import Watchlist from './Components/Watchlist/Watchlist';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/*
  Routes to various pages of the website.
*/
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/createListing' component={ListingForm} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignUpPage} />
      <Route exact path='/findTextbooks' component={FindTextbooks} />
      <Route exact path='/manageListings' component={ManageListings} />
      <Route exact path='/editListing' component={EditListing} />
      <Route exact path='/watchlist' component={Watchlist} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
