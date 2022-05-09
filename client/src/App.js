import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {Home} from "./components/Home.js";
import {About} from "./components/About.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js"
import useToken from "./hooks/useToken";

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

  return (<div>
    <div class = "row">
      <div class="p-3 bg-primary bg-gradient text-white">
        <h1>UEA Parking</h1>                        
        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/login" role="button">Login</a>
        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button">Support</a>
        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/about" role="button">About</a>
        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "/home" role="button">Home</a>
      </div>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  </div>)
}
/*
    return  token ? (
    <div className="wrapper">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
         
      </Routes>
      </BrowserRouter> 
    </div>
  ) : <Login setToken ={setToken} />
}
*/
export default App;
