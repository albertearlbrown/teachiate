import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Alert from '@material-ui/lab/Alert';
import { AuthStoreContext } from '../../Store/AuthStore';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(false);
    const {isAuthenicate, setIsAuthenicate, setUserData } = useContext(AuthStoreContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const formHandler = async (e) => {
        e.preventDefault();
        const resp = await axios.post('http://localhost:4000/auth/login', {
            email: email,
            password: password
        });

        if(resp.data.success === true) {
            localStorage.setItem('jwt_token', resp.data.token);
            setError(false);
            const config = {
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('jwt_token')
                }
            };
            axios.get('http://localhost:4000/users/me', config)
            .then((res) => {
                if(res.data.success === true) {
                    setUserData(res.data.data);
                    setIsAuthenicate(true);
                }
            });
        }

        else {
            setErrorMessage(resp.data.message);
            setError(true);
        }
    };

    const googleResponse = async (resp) => {
      debugger
      await axios({
        method: "post",
        url:"http://localhost:4000/auth/google",
        data: {
          code: resp.code
        }
      }).then(response=>{
        const jwt_token = response.data.token
        localStorage.setItem('jwt_token', jwt_token);
        const config = {
            headers: {
                Authorization: 'Bearer '+jwt_token
            }
        };
        axios.get('http://localhost:4000/users/me', config)
        .then((res) => {
            if(res.data.success === true) {
                setUserData(res.data.data);
                setIsAuthenicate(true);
            }
        });
      })
    }

    const responseFacebook = async resp => {
      debugger
      await axios({
        method: "post",
        url:"http://localhost:4000/auth/facebook",
        data: {
          ...resp
        }
      }).then(response=>{
        const jwt_token = response.data.token
        localStorage.setItem('jwt_token', jwt_token);
        const config = {
            headers: {
                Authorization: 'Bearer '+jwt_token
            }
        };
        axios.get('http://localhost:4000/users/me', config)
        .then((res) => {
            if(res.data.success === true) {
                setUserData(res.data.data);
                setIsAuthenicate(true);
            }
        });
      })
    }

    const onFailure = (error) => {
        alert(error);
    };

    return (
        <>
            {isAuthenicate ? <Redirect to="/"/> : null}
            <section className="main_register">
                <div className="container">
                    <div className="main_signin_area">
                        <h2>Sign In</h2>
                        {error ? <Alert severity="error" style={{marginBottom: '20px'}}>{errorMessage}</Alert> : null}
                        <form method='POST' onSubmit={formHandler}>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-12">
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
                                <div className="row">
                                    <div className="col-md-12">
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText="Login"
                                        responseType="code"
                                        onSuccess={(e)=>googleResponse(e)}
                                        onFailure={(e)=>onFailure(e)}
                                        render={renderProps => (
                                            <button
                                              className="google-login-button"
                                              onClick={renderProps.onClick}
                                              disabled={renderProps.disabled}>
                                              Login with Google
                                              </button>
                                          )}
                                    />
                                    <FacebookLogin
                                      appId="1640321232815333"
                                      fields="name,email,picture"
                                      callback={(e)=>responseFacebook(e)}
                                      cssClass="facebook-login-button"
                                      icon="fa-facebook"
                                    />
                                    </div>
                                </div>
                                <ul className="made_accnt">
                                    <li><Link to="/register">Create New Account?</Link></li>
                                    <li><Link to="/forgot-password">Forget Password?</Link></li>
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
