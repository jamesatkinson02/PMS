import React, { useState } from 'react';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {useNavigation} from 'react-router-dom';
import "./Home.css";
import "./tim-meyer-X-3CqrZd6R0-unsplash.jpg";
import "./darkenImageOnMouseover";

export function Home()
{
    const navigate = useNavigate();
        
    const logout = () =>{
        localStorage.removeItem('token');
        navigate(0);                        //refreshes page
    }

    return (<div class = "container-fluid">
        
                <div class = "row">
                    <div class="p-3 bg-primary bg-gradient text-white">
                        <h1>UEA Parking</h1>
                        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "./Login.js" role="button">Login</a>
                        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "Home.js" role="button">Support</a>
                        <a class="btn btn-outline-light bg-gradient links nav-bar-btn" href = "./About.js" role="button">About</a>
                    </div>
                </div>

                <div class="content">
                    <div class="items-collection">
                        <a href = "#">
                            <div class="item">
                                <div class="item-background">
                                    <img class = "splash-screen-img" src={require('./tim-meyer-X-3CqrZd6R0-unsplash.jpg')} alt = "Car Park"/>
                                </div>

                                <div class="item-foreground">
                                    <div class="item-subtitle">   
                                        <h1 class = "display-1">Your One-Stop Parking Service</h1>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>


                <h1> Home Page </h1>
                <button type="button" class="btn btn-primary bg-gradient nav-bar-btn" onClick={() => {logout()} 
                }> Signout </button>
                
            </div>)
}
