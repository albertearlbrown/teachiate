import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// // Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authStatus = useStoreState(state => state.islogin);
    const loginAction = useStoreActions(actions => actions.userLogin);
    const [error, setError] = useState('');

    const formHandler = async (e) => {
        e.preventDefault();

        const resp = await axios.post('https://teachiate-backend.fnmotivations.com/auth/login', {
            email: email,
            password: password            
        });

        if(resp.data.success === true) {
            localStorage.setItem('jwt_token', resp.data.token);
            setError('');
            loginAction();            
        }

        else {
            setError(resp.data.message);
        }
    };

    const facebookLogin = async (e) => {
        e.preventDefault();        
        try  {
            const provider = new firebase.auth.FacebookAuthProvider();
            const auth = await firebase.auth();
            auth.signInWithPopup(provider).then((result) => {
                
                // The signed-in user info.
                var user = result.user;    

                if(user) {
                    const property = {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        emailVerified: user.emailVerified,
                        uid: user.uid                        
                    }
                    localStorage.setItem('jwt_token', property);
                    loginAction();
                } 
            });
        }
        catch(error) {
            // Handle Errors here.
            var errorMessage = error.message;            
            console.log(errorMessage);
        }
    };

    const googleLogin = async (e) => {
        e.preventDefault();        
        try  {
            const provider = new firebase.auth.GoogleAuthProvider();
            const auth = await firebase.auth();
            auth.signInWithPopup(provider).then((result) => {

                // The signed-in user info.
                var user = result.user;    

                if(user) {
                    const property = {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        emailVerified: user.emailVerified,
                        uid: user.uid                        
                    }
                    localStorage.setItem('jwt_token', property);
                    loginAction();
                } 
            });
        }
        catch(error) {
            // Handle Errors here.
            var errorMessage = error.message;            
            console.log(errorMessage);
        }
    }


    return (
        <>
            {authStatus ? <Redirect to='/opening-school-in-covid-siutation'/> : null}
            <section className="main_register">
                <div className="container">
                    <div className="main_signin_area">
                        <h2>Sign In</h2>
                        <form method='POST' onSubmit={formHandler}>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-12">
                                        {error !== '' ? <p>Error: {error}</p> : null}
                                        <div className="register_field_col">
                                            <p>Email</p>
                                            <input type="text" className="register_input" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Password</p>
                                            <input type="password" className="register_input" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="submit" className="register_submit" value="Sign In"/>
                                    </div>
                                </div>
                                <ul className="made_accnt">
                                    <li><Link to="/register">Create New Account?</Link></li>
                                    <li><Link to="/">Forget Password?</Link></li>
                                </ul>
                                {/* <div className="other_login">
                                    <ul>
                                        <li className="btn-with-facebook" onClick={facebookLogin}>
                                            <Link to="#"><img src="/assets/img/facebook_login.png" alt=""/>Continue With Facebook</Link>
                                        </li>
                                        <li className="btn-with-google" onClick={googleLogin}>
                                            <Link to="#"><img src="/assets/img/google_login.png" alt=""/>Continue With Google</Link>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>                            
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;