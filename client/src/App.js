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
    return false;
  }
  return true;
  
}).then(value => value.valueOf());

return isVerified;
}

function App() {
  let {token, setToken} = useToken();

  verify(token).then(val => {
    if(!val)
    {
      localStorage.removeItem('token');
      token = null;
    }
     
  })

   return( //token ? (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
       </Routes>
      </BrowserRouter> 
    </div>
  )// : <Login setToken ={setToken} />
}

export default App;
