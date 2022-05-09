import React, { useState } from 'react';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {useNavigation} from 'react-router-dom';
import "./Home.css";
import "./Login.css";
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
                
                <a class="btn btn-primary btn-lg btn-block" href = "/login"><h1 class = "display-3 btn-txt">Get Started</h1></a>
                <button type="button" class="btn btn-primary bg-gradient nav-bar-btn" onClick={() => {logout()} 
                }> Signout </button>
                
            </div>)
}
