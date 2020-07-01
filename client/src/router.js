import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CounterPage } from './pages/CounterPage';
import { AboutPage } from './pages/AboutPage';

export const useRouter = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route exact path="/">
                    <CounterPage />
                </Route>

                <Route exact path="/about">
                    <AboutPage />
                </Route>

                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route exact path="/">
                <AuthPage />
            </Route>

            <Route exact path="/about">
                <AboutPage />
            </Route>

            <Redirect to="/" />
        </Switch>
    );
};