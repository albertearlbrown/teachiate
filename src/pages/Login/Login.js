import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authStatus = useStoreState(state => state.islogin);
    const userLogin = useStoreActions(actions => actions.userLogin);
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
            userLogin();            
        }

        else {
            setError(resp.data.message);
        }
    };

    return (
        <>
            {authStatus ? window.location.replace("/") : null}
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
                            </div>                            
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;