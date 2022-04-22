import {useState} from 'react';

export default function useToken()
{

    const getToken = () => {
        const tokenStr= localStorage.getItem('token');
        const jsonToken = JSON.parse(tokenStr);
        return jsonToken?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }

}