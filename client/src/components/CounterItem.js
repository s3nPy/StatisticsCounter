import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { CounterChart } from './CounterChart';
import { useId } from 'react-id-generator';
import { useToast } from '../hooks/message.hook';

export const CounterItem = ({refresh, counter}) => {
    const [value, setValue] = useState(0);
    const [total, setTotal] = useState(0);
    const [last, setLast] = useState(0);
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [htmlId] = useId();
    const toast = useToast();

    const handleChange = e => {
        if(!isNaN(+e.target.value))
            setValue(e.target.value);
    };

    const addValue = async () => {
        try {
            await request('/counter/add', 'POST', {value, id: counter._id}, {
                Authorization: `Bearer ${token}`
            });
            counter.values.push(+value);
            counter.dates.push(Date.now());
            updateStates();
            toast('Value added');
        } catch (error) {}
    };

    const deleteItem = async () => {
        try {
            await request('/counter/delete', 'POST', {id: counter._id}, {
                Authorization: `Bearer ${token}`
            }); 
            refresh();
            toast('Counter deleted');
        } catch (error) {}
    };

    const updateStates = useCallback( () => {
        setTotal(counter.values.length ? counter.values.reduce( (a, b) => a + b) : 0);
        setLast(counter.values[counter.values.length-1] || 0);
    }, [setLast, setTotal, counter.values]);

    useEffect( () => {
        updateStates();
    }, [updateStates]);

    return (
        <div className="row">
            <div className="col s12 no-padding">
                <div className="card deep-purple lighten-2 deep-purple-text text-lighten-2">
                    <div className="card-content white-text">
                        <span className="card-title">{counter.name}</span>
                        <div className="row">
                            <div className="col s4">
                                <p><strong>Total:</strong>&nbsp;{total}</p>
                                <p><strong>Last:</strong>&nbsp;+{last}</p>
                            </div>
                            <div className="col s8">
                                <CounterChart 
                                    counter={counter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action z-depth-1">
                        <div className="row no-padding no-margin flex-space">
                            <div className="input-field inline no-margin col s5">
                                <input 
                                    id={htmlId} 
                                    type="number" 
                                    className="validate deep-purple-text text-lighten-5" 
                                    onChange={handleChange}
                                />
                                <label htmlFor={htmlId}>Add</label>
                            </div>
                            <button 
                                className="btn waves-effect waves-light col s4 offset-s1 deep-purple lighten-4"
                                disabled={loading}
                                onClick={addValue}
                            >
                                Add
                            </button>
                            <button 
                                className="btn waves-effect waves-light col s1 offset-s1 red lighten-4"
                                disabled={loading}
                                onClick={deleteItem}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};