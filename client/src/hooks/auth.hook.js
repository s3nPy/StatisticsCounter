import { useCallback, useState } from "react";
import { useEffect } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback( jwtToken => {
        setToken(jwtToken);
        localStorage.setItem('token', jwtToken);
    }, [setToken]);

    const logout = useCallback( () => {
        setToken(null);
        localStorage.removeItem('token');
    }, [setToken]);

    useEffect( () => {
        const jwtToken = localStorage.getItem('token');
        setToken(jwtToken);
        setReady(true);
    }, []);

    return { token, login, logout, ready };
};