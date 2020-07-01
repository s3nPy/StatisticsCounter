import React, { useState } from 'react';
import { useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from './Loader';
import { useToast } from '../hooks/message.hook';


export const AddCounter = ({refresh}) => {
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const toast = useToast();

    const toggleActive = () => {
        setActive(!active);
    };

    const handleChange = e => {
        setName( e.target.value );
    };

    const handleCreate = async () => {
        try {
            await request('/counter/create', 'POST', {name}, {
                Authorization: `Bearer ${token}`
            });
            await refresh();
            toast(`Counter ${name} added`);
            toggleActive();
        } catch (error) {}
    };

    if(active){
        return (
            <>
            <div className="row deep-purple lighten-5 z-depth-1 flex-space">
                <div className="input-field inline no-margin col s9">
                    <input placeholder="name" onChange={handleChange}/>
                </div> 
                <button 
                    className="waves-effect waves-light deep-purple lighten-3 btn col s3"
                    disabled={loading}
                    onClick={handleCreate}
                >
                    Create
                </button>
            </div>
            {loading && <Loader type="progress" />}
            </>
        );
    }

    return (
        <div className="row">
            <span 
                className="waves-effect waves-light btn-large deep-purple lighten-5 deep-purple-text text-darken-4 col s12"
                onClick={toggleActive}
            >
                <div>
                    <i className="large material-icons">control_point</i>
                </div>
            </span>
        </div>
    );
} 