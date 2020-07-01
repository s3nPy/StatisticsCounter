import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const toast = useToast();
    const {request, loading} = useHttp();
    const [form, setForm] = useState({});

    const handleChange = e => {
        setForm( {...form, [e.target.name]: e.target.value} );
    };

    const register = async () => {
        try {
            await request('/auth/register', 'POST', form);
            toast('User successfully registered');
        } catch (error) {
            toast(`${error}`);
        }
        
        
    };

    const login = async () => {
        try {
            const data = await request('/auth/login', 'POST', form);
            auth.login(data.token);
            toast('User successfully logged in');
        } catch (error) {
            toast(`${error}`);
        }
    };

    return (
    <div className="row">
        <div className="col s6 offset-s3">
            <div className="card deep-purple lighten-5">
                <div className="card-content black-text">
                    <span className="card-title">Authentication</span>
                    <div className="divider"></div>
                    <div className="input-field">
                        <input 
                            id="email" 
                            type="email" 
                            name="email"
                            className="validate" 
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="password"
                            type="password" 
                            name="password"
                            className="validate" 
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="card-action deep-purple lighten-3">
                    <button 
                        className="waves-effect waves-light btn deep-purple lighten-4 black-text"
                        disabled={loading}
                        onClick={login}
                    >
                        Login
                    </button>
                    <button 
                        className="waves-effect waves-light btn deep-purple lighten-4 black-text"
                        disabled={loading}
                        onClick={register}
                    >
                        Register
                    </button>
                </div>
            </div>
            {loading && <Loader type="progress"/>}
        </div>
    </div>   
    );
};