import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js"
import useToken from "./hooks/useToken";


function App() {
  const {token, setToken} = useToken();

  
    return token ? (
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

export default App;
