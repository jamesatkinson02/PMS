import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./components/Home.js";
import Login from "./components/Login.js";
import useToken from "./components/useToken";

function App() {
  const {token, setToken} = useToken();

  if(!token)
    return <Login setToken={setToken} />
  return (
    <div className="wrapper">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
