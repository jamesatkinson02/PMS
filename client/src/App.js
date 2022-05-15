import React from "react";
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

async function verify(token)
{
  var isVerified = fetch("/api/verify-token", {
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

  const init = verify(token).then(val => {
    if(!val)
    {
      localStorage.clear();
      token = null;
      return null;
    }
    else{
      return val;
    }
     
  })

   return( //token ? (
     
    <div>
      <div class = "row">
        <div class="p-3 bg-primary bg-gradient text-white">
          <h1>UEA Parking</h1>                        
          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/login" role="button">Login</a>
          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button">Support</a>
          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/about" role="button">About</a>
          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button">Home</a>
          <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/my-bookings" role="button">My Bookings</a>
        </div>
      </div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/search" element={<BookingSearch />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        
        {init.admin ? <Route path="/manage-accounts" element={<ManageAccounts />} /> : null}
       </Routes>
      </BrowserRouter> 
   
    </div>
  ) //: <Login setToken ={setToken} />);
}

export default App;
