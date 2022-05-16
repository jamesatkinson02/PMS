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
                                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img class="d-block w-100 img-1" src={require("./tim-meyer-X-3CqrZd6R0-unsplash.jpg")} alt="..."></img>
                                        </div>
                                    
                                        <div class="carousel-item">
                                            <img class="d-block w-100 img-2" src={require("../images/HEP-2.png")} alt="..."></img>
                                        </div>
                                    
                                        <div class="carousel-item">
                                            <img class="d-block w-100 img-3" src={require("../images/HEP.png")} alt="..."></img>
                                        </div>
                                    </div>

                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                                </div>

                                <div class="item-foreground">
                                    <div class="item-subtitle">
                                        <h1 class="display-1">Your One-Stop Parking Service</h1>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                
          
                <div class="textSubtitles">
                    <div class="Text">
                        <h3>Make Commuting Easy</h3>
                    </div>

                    <div class="Text">
                        <h3>Always Stay Informed</h3>
                    </div>

                    <div class="Text">
                        <h3>A Straight-Forward Experience</h3>
                    </div>
                </div>

                <dev class="TriWrapper">
                    <img class="TriImage" src={require("../images/ParkingTriImage.png")} alt="An image containing, a map, a credit card and a parking garage."></img>
                </dev>

                <h1>Reviews</h1>
                <div class="item">
                    <div class="card">
                        <span class="border border-3">
                            <div class="card-body">
                                <h5 class="card-title">A wonderful system</h5>
                                <h6 class="card-subtitle mb-2 text-muted">⭐⭐⭐⭐⭐</h6>
                                <p class="card-text">   This new system is so much easier! I always had trouble with the pay at machine, who carries around coins anyway? 
                                                        It’s the future! Amazing innovation, try it out.</p>
                                <a href="#" class="card-link">Jane L</a>
                                <a href="#" class="card-link">Norwich, UK</a>
                            </div>
                        </span>
                    </div>

                    <div class="card">
                        <span class="border border-3">
                            <div class="card-body">
                                <h5 class="card-title">Nice and intuitive</h5>
                                <h6 class="card-subtitle mb-2 text-muted">⭐⭐⭐⭐⭐</h6>
                                <p class="card-text">   I would highly recommend this website! It is so easy to use, and you can pay incredibly easy. 
                                                        The interface is user friendly and easy to navigate through!</p>
                                <a href="#" class="card-link">Chris D</a>
                                <a href="#" class="card-link">Cambridge, UK</a>
                            </div>
                        </span>
                    </div>

                    <div class="card">
                        <span class="border border-3">
                            <div class="card-body">
                                <h5 class="card-title">Excellent customer service!</h5>
                                <h6 class="card-subtitle mb-2 text-muted">⭐⭐⭐⭐⭐</h6>
                                <p class="card-text">   Amazing service! I had some trouble and had to cancel my slot, they were very friendly and efficient in helping. 
                                                        Best customer support!</p>
                                <a href="#" class="card-link">John R</a>
                                <a href="#" class="card-link">Norwich, UK</a>
                            </div>
                        </span>
                    </div>

                    <div class="card">
                        <span class="border border-3">
                            <div class="card-body">
                                <h5 class="card-title">A handy solution</h5>
                                <h6 class="card-subtitle mb-2 text-muted">⭐⭐⭐⭐⭐</h6>
                                <p class="card-text">   Would highly recommend trying! Saves you from having to bring change all the time!</p>
                                <a href="#" class="card-link">Sarah M</a>
                                <a href="#" class="card-link">Ipswich, UK</a>
                            </div>
                        </span>
                    </div>

                    <div class="card">
                        <span class="border border-3">
                            <div class="card-body">
                                <h5 class="card-title">Good customer service</h5>
                                <h6 class="card-subtitle mb-2 text-muted">⭐⭐⭐⭐⭐</h6>
                                <p class="card-text">   Customer support is great, they respond real-time and resolve problems quickly. 
                                                        I didn't have to wait long at all. 10/10 Service!</p>
                                <a href="#" class="card-link">Mark P</a>
                                <a href="#" class="card-link">Great Yarmouth, UK</a>
                            </div>
                        </span>
                    </div>
                </div>                
            </div>)
}