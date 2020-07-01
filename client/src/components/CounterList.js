import React from 'react';
import { CounterItem } from './CounterItem';

export const CounterList = ({refresh, counters}) => {
    
    if(!counters.length){
        return ( 
            <div className="center">
                <strong>no counters yet</strong>
            </div>
        );
    }
    
    return (
        <div>
            {counters.map( counter => {
                return (
                    <CounterItem 
                        key={counter._id} 
                        counter={counter}
                        refresh={refresh}
                    />);
            })}
        </div>
    );
};