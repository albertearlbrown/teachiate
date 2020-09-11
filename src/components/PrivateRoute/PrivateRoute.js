import React from 'react';
import {  Route,  Redirect} from 'react-router-dom';

export const PrivateRoute = (({ component: Component, ...rest }) => {    
    return (
        <Route 
            {...rest}  
            render={props => {  
                if(typeof localStorage !== "undefined" && localStorage.getItem('jwt_token') !== null) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to="/login"/>
                }
            }}
        />
    );
});