import React, { useContext } from 'react';
import {  Route,  Redirect} from 'react-router-dom';
import { AuthStoreContext } from '../../Store/AuthStore';

export const PrivateRoute = (({ component: Component, ...rest }) => {    
    const { isAuthenicate } = useContext(AuthStoreContext);

    return (
        <Route 
            {...rest}  
            render={props => {  
                if(isAuthenicate) {
                    return <Component {...props} {...rest}/>
                }
                else {
                    return <Redirect to="/login"/>
                }
            }}
        />
    );
});