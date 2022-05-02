import React, { useState } from 'react';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {useNavigation} from 'react-router-dom';

export function Home()
{
    const navigate = useNavigate();

    
        
    const logout = () =>{
        localStorage.removeItem('token');
        navigate(0);                        //refreshes page
    }

    return (<div>
                <h1> Home Page </h1>
                <button onClick={() => {logout()} 
                }> signout </button>
            </div>)
}
