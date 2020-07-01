import { useState, useCallback } from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const request = useCallback(async (url, method='GET', body=null, headers={}) => {
        setLoading(true);
        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            
            if(!response.ok){
                throw new Error(data.message || "Error has occurred due to bad response");
            }

            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading, error, clearError };
};