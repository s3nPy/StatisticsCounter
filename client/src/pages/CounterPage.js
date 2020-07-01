import React, { useState, useContext, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { AddCounter } from '../components/AddCounter';
import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { CounterList } from '../components/CounterList';

export const CounterPage = () => {
    const [ counters, setCounters ] = useState([]);
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    const refreshCounters = useCallback( async () => {
        try {
            const data = await request('/counter/', 'POST', null, {
                Authorization: `Bearer ${token}`
            });
            setCounters(data);
        } catch (error) {}
    }, [request, token]);

    useEffect( () => {
        refreshCounters();
    }, [refreshCounters]);

    return (    
        <div>
            <AddCounter refresh={refreshCounters}/>
            <div className="divider"></div>
            {loading ? 
                <Loader type='circle'/> : 
                <CounterList refresh={refreshCounters} counters={counters}/>
            }
        </div>
    )
};