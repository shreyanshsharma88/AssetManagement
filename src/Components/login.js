import '../App.css'
import loginImg from '../images/LoginImage.png'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobally } from './globalToken';


export function LoginPage() {
    const { setToken } = useGlobally()
    const navigate = useNavigate('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    
    async function handleApply() {
        try {
            const res = await fetch('https://devassetapi.remotestate.com/asset-management/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });

            if (!res.ok) {
                throw new Error('login failed')
            }

            const data = await res.json();
            const token = data.token;
            // console.log(token)

            localStorage.setItem('token', token);


            if (token) {
                setToken(token)
                navigate('/dashboard')
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='loginPage'>


            <img className='loginImage' src={loginImg}></img>


            <form className='loginForm'>
                <p style={{ fontSize: '54px', fontWeight: '100' }}>Login to Admin Panel</p>
                <label style={{ flexDirection: 'flex-start' }}>Email </label>
                <br />
                <input
                    onChange={(e) => {
                        setCredentials({
                            ...credentials,
                            email: e.target.value
                        });
                    }}
                    type='text'
                    name='email'
                    placeholder='type in email'
                />
                <br />
                <label>Password </label>
                <br />
                <input
                    onChange={(e) =>{
                        setCredentials({
                            ...credentials,
                            password: e.target.value
                          });
                    }}
                    type='password'
                    name='password'
                    placeholder='type in password'
                />
                <div className='check'>

                    <input style={{ height: '20px', width: '20px' }} type='checkBox' />
                    <div style={{ width: '150px' }}>
                        Remember Me
                    </div>
                </div>

                <Button
                    onClick={handleApply}
                    style={{ width: '350px', height: '50px', marginTop: "45px" }}
                    variant="contained"
                >Log in</Button>

            </form>
        </div>
    )
}