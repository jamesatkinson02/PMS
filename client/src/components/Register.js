import {React, setState, useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register()
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [carRegistration, setCarRegistration] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        fetch("/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({username, password, email, carRegistration})
        })

        window.location.reload();
    }

    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p> Username: </p>
                    <input type="text" onChange={e => {setUsername(e.target.value)}} required />
                </label>
                <label>
                    <p>Email: </p>
                    <input type="email" onChange={e => {setEmail(e.target.value)}} required /> 
                </label>

                <label>
                    <p>Car Registration: </p>
                    <input type="text" onChange={e=>{setCarRegistration(e.target.value)}} required />
                </label>
                <label>
                    <p> Password: </p>
                    <input type="password" onChange={e => {setPassword(e.target.value)}} required />
                </label>
                <button type="submit"> Register </button>
            </form>
        </div>);
}

