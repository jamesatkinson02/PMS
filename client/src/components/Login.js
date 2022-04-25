import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, Router, Route} from 'react-router-dom';
import { render } from 'react-dom';
import Register from './Register'



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
    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({username, password});
        if(token)
            setToken(token);    
       
    }
    
    return !register ? (
        
        <div>
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
        </div>
        
    ) : <Register />
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}