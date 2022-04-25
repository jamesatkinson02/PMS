import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, Router, Route} from 'react-router-dom';
import { render } from 'react-dom';
import Register from './Register'
import "./Login.css";


async function loginUser(credentials) {
    const response =  fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if((await response).status == 400)
    {
        console.error("Incorrect username/password");
        return;
    }

    return response.then(data => data.json());

}

export default function Login({setToken})
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState();
    const [success, setSuccess] = useState();
    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({username, password});
        if(token)
        {
            setSuccess(true);
            setToken(token);    
        }
        else
            setSuccess(false);
       
    }
    
    return !register ? (
        <div>
        <h1>Login</h1>
        <div className="wrapper">
            <div className="center">
        <form onSubmit={handleSubmit}>
            <label>
                <p> username </p>
                <input type="text" onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                <p> password </p>
                <input type="password" onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
        </form>
        <button onClick={() => {setRegister(true)}}> Sign up here! </button>
        {success===false ? <p className="red"> Incorrect Username/Password </p> : null}
        </div>
        </div>
        </div>
    ) : <Register />
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}