import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';
import { useMemo } from 'react';


export const CounterChart = ({counter}) => {
    const data = useMemo( () => {
        const values = counter.values.reduce( (p, c) => {
            p.push(c + p[p.length-1]);
            return p;
        }, [0]).slice(1);
        return values.map( (value, index) => {
            return {
                value,
                date: new Date(counter.dates[index]).toLocaleDateString()
            };
        });
        // eslint-disable-next-line
    }, [counter, counter.values.length]);
        
    return (
        <div className="deep-purple lighten-3 z-depth-3 white-text">
        <ResponsiveContainer 
            width='100%' 
            aspect={2}
        >
            <LineChart 
                data={data}
            >
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ede7f6"
                    strokeWidth={2}
                    dot={{stroke: '#ede7f6', strokeWidth: 1}} 
                />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
};