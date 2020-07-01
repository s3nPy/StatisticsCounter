import { createContext } from "react";

function noop() {console.log('noop')}

export const AuthContext = createContext({
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});