import {React, setState, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Form, Button } from 'react-bootstrap';


export default function Register()
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [carRegistration, setCarRegistration] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        let respNum = await fetch("/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({username, password, email, carRegistration, contactNumber})
        }).then(resp =>resp.status);



        if(respNum === 400)
        {
            setErrorMsg("Username already been used!");
            
        }

        if(!errorMsg)
            navigate("/login"); 

       
        
    }

    return( 
        <div className="registerWrapper">
            <div className="d-flex justify-content-center align-items-center">
                <Form onSubmit={handleSubmit} className="rounded p-5 xl">
                    <h1> Register </h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={e => {setUsername(e.target.value)}} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={e => {setEmail(e.target.value)}} required /> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car Registration</Form.Label>
                        <Form.Control type="text" onChange={e=>{setCarRegistration(e.target.value)}} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="tel" onChange={e => setContactNumber(e.target.value)} required></Form.Control>
                        <Form.Text className="text-muted">We'll never share this with anyone.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label> 
                        <Form.Control type="password" onChange={e => {setPassword(e.target.value)}} required />
                    </Form.Group>
                    {errorMsg ? <p style={{color:"red"}}>{errorMsg}</p> : null}
            
                    <Button variant="primary" type="submit"> Register </Button>
                </Form>
            </div> 
        </div>);
}

