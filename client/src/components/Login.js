import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, Router, Route} from 'react-router-dom';
import { render } from 'react-dom';
import Register from './Register'
import "./Login.css";
import {Container, Form, Button, Alert} from 'react-bootstrap';


async function loginUser(credentials) {
    const response =  fetch('/api/login', {
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
    const [show, setShow] = useState(true);
    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({username, password});
        if(token)
        {
            setSuccess(true);
            setToken(token);    
        }
        else
        {
            setSuccess(false);

        }
       
    }
    
    return !register ? (
        <div className="loginWrapper">
        <div className="d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3 center box loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
            <Form.Group className="mb-3">
                <Form.Label> Username </Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter Username" required />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label> Password </Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="password" required />
            </Form.Group>
            {success===false ? <Alert variant="danger"><h6>Incorrect Username/Password </h6> </Alert> : null}
            <Button variant="primary" type="submit">Sign in </Button>
        </Form>
        </div>
        <button style={{margin:"10px"}} onClick={() => {setRegister(true)}}> Sign up here! </button>
        </div>
    ) : <Register />
}
  
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}