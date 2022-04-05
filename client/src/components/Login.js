import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({setToken})
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({username, password});
        setToken(token);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p> username </p>
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p> password </p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}