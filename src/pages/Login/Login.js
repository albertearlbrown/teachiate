import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Alert from '@material-ui/lab/Alert';
import { AuthStoreContext } from '../../Store/AuthStore';
import axios from 'axios';
import { Auth } from 'aws-amplify'

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"

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
        Auth.signIn(email, password)
          .then(user => {
            window.location.reload()
            return true
          })
          .catch(() => {
            return false
          })
    };

    const googleResponse = async (resp) => {
      await axios({
        method: "post",
        url:baseUrl+"/auth/google",
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
        axios.get(baseUrl+'/users/me', config)
        .then((res) => {
            if(res.data.success === true) {
                setUserData(res.data.data);
                setIsAuthenicate(true);
            }
        });
      })
    }

    const responseFacebook = async resp => {
      await axios({
        method: "post",
        url:baseUrl+"/auth/facebook",
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
        axios.get(baseUrl+'/users/me', config)
        .then((res) => {
            if(res.data.success === true) {
                setUserData(res.data.data);
                setIsAuthenicate(true);
            }
        });
      })
    }

    const onFailure = (error) => {
        console.log(error);
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
                                      <button
                                        className="google-login-button"
                                        onClick={() => Auth.federatedSignIn({provider: 'Google'})}
                                        >
                                        <i className="fa fa-google" /> Login with Google
                                      </button>
                                    <div
                                      onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
                                      className="facebook-login-button"
                                      icon="fa-facebook"
                                    >
                                      <i className="fa fa-facebook" /> Log in with Facebook
                                    </div>
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
