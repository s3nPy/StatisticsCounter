import React from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { useRouter } from './router';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';
import { Loader } from './components/Loader';
import { NavBar } from './components/NavBar';

function App() {
    const { token, ready, login, logout } = useAuth();
    const isAuthenticated = !!token;
    const router = useRouter(isAuthenticated);

    if(!ready){
        return <Loader type="circle"/>;
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, isAuthenticated
        }}>
        <BrowserRouter>
            <NavBar />
            <div className='container content'>
                {router}
            </div>
        </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
