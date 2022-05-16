import {React, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {Home} from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js"
import useToken from "./hooks/useToken";
import {Booking} from "./components/Booking.js"
import {Navbar, Container, Nav} from "react-bootstrap";
import {About} from "./components/About"
import { BookingSearch } from "./components/BookingSearch";
import MyBookings from "./components/MyBookings";
import ManageAccounts from "./components/ManageAccounts";
import ParkingUsage from "./components/ParkingUsage"
import {Support} from "./components/Support"

import useNavigate from 'react';
import SpaceManagement from "./components/SpaceManagement";

async function verify(token)
{
  var isVerified = await fetch("/api/verify-token", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'

    },
    body: JSON.stringify({token:token})
}).then(data => data.json()).then(json => {
  if(json.name == 'TokenExpiredError')
  {
    
    return null;
  }
 
  return json;
  
});

return isVerified;
}



function App() {
  let {token, setToken} = useToken();
  let [admin, setAdmin] = useState(null);
  const init = verify(token);
  init.then(value => {if(!value) {localStorage.clear(); setToken(null);}})


    init.then(value => setAdmin(value.admin))


   return( //token ? (
     
    <div>
      <div class = "row">
        <div class="p-3 bg-primary bg-gradient text-white">
          <h1>UEA Parking</h1>                        
          {token ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button" onClick={() => setToken(null)}>Signout</a> : <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/login" role="button">Login</a>}
          {!token ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/register" role="button">Sign up</a> : null}
          {!admin ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/support" role="button">Support</a> : null}
          {!admin ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/about" role="button">About</a> : null}
          {admin ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/manage-accounts" role="button">Manage Accounts</a> : null}
          {admin ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/parking-usage" role="button">Park Status</a> : null}
          
          {token ? <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/my-bookings" role="button">My Bookings</a> : null}

          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button">Home</a>
        </div>
      </div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/booking" element={<Booking />} />
        <Route path="/support" element={<Support />} />
        
        <Route path="/booking/search" element={<BookingSearch />}></Route>
        {token ? <Route path="/my-bookings" element={<MyBookings />} /> : <Route path="/my-bookings" element={<Login setToken={setToken} />}></Route>}

        <Route path="/about" element={<About />} />
        {!token ? <Route path="/login" element={<Login setToken={setToken} />} /> : null}
        {admin ? <Route path="/manage-accounts" element={<ManageAccounts />} /> : null}
        {admin ? <Route path="/parking-usage" element={<ParkingUsage />} /> : null}
     
       </Routes>
      </BrowserRouter> 
   
    </div>
  ) //: <Login setToken ={setToken} />);
}

export default App;
