import React, { useState, useEffect, useContext } from 'react';
import { AuthStoreContext } from '../../Store/AuthStore';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Alert from '@material-ui/lab/Alert';
import { Auth } from 'aws-amplify'

import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"

function Register() {

    const { isAuthenicate, setIsAuthenicate, setUserData } =  useContext(AuthStoreContext);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, SetRole] = useState('');
    const [acceptTermCond, setAcceptTermCond] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {

    }, []);

    const formHandler = async (e) => {
        e.preventDefault();

        const data = {
            fullName: fullName,
            email,
            password,
            role
        };

        const resp = await axios.post('http://localhost:4000/auth/signup', data);

        if(resp.data.success === true) {
          return Auth.signIn(email, password)
            .then(user => {
              window.location.reload()
              return user
            })
            .catch(() => {
              return false
            })
        }
        else {
            setErrorMessage(resp.data.message);
            setError(true);
        }
    }

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

    const onFailure = (error) => {
        alert(error);
    };

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

    return (
        <>
            {isAuthenicate ? <Redirect to='/'/> : null}
            <section className="main_register">
                <div className="container-fluid">
                    <div className="main_register_area">
                        <h2>Registration</h2>
                        {error ? <Alert severity="error" style={{marginBottom: '20px'}}>{errorMessage}</Alert> : null}
                        <form onSubmit={formHandler}>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Full Name</p>
                                            <input type="text" className="register_input" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Email</p>
                                            <input type="email"  placeholder="sarah.jones@gmail.com" className="register_input"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Create Password</p>
                                            <input type="password" className="register_input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Confirm Password</p>
                                            <input type="password" className="register_input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Type of User</p>
                                            <div  className="choose_field">
                                            <p>
                                                <input type="radio" id="test1" name="radio-group" value="Parent" onChange={(e) => SetRole(e.target.value)}/>
                                                <label htmlFor="test1">Parent</label>
                                            </p>
                                            <p>
                                                <input type="radio" id="test2" name="radio-group" value="Teacher" onChange={(e) => SetRole(e.target.value)}/>
                                                <label htmlFor="test2">Teacher</label>
                                            </p>
                                            <p>
                                                <input type="radio" id="test3" name="radio-group" value="Student" onChange={(e) => SetRole(e.target.value)}/>
                                                <label htmlFor="test3">Student</label>
                                            </p>
                                            <p>
                                                <input type="radio" id="test4" name="radio-group" value="General Education" onChange={(e) => SetRole(e.target.value)}/>
                                                <label htmlFor="test4">General Educator</label>
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="register_terms_area">
                                      <div className="new">
                                      <div>
                                          <div className="form-group">
                                              <input type="checkbox" id="html" value={acceptTermCond} onChange={(e) => setAcceptTermCond(true)}/>
                                              <label htmlFor="html">I accept the <a href="/">Terms And Conditions</a></label>
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                                  <input type="submit" className="register_submit" value="Submit" name=""/>
                                </div>
                                <div className="row">
                                  <div className="col-md-6"/>
                                  <div className="col-md-6" style={{right: -20}}>
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        responseType="code"
                                        onSuccess={(e)=>googleResponse(e)}
                                        onFailure={(e)=>onFailure(e)}
                                        render={renderProps => (
                                            <button
                                              className="google-login-button"
                                              onClick={renderProps.onClick}
                                              disabled={renderProps.disabled}>
                                              Register with Google
                                              </button>
                                          )}
                                    />
                                    <FacebookLogin
                                      appId="1640321232815333"
                                      fields="name,email,picture"
                                      callback={(e)=>responseFacebook(e)}
                                      cssClass="facebook-register-button"
                                      icon="fa-facebook"
                                    />
                                  </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
};

export default Register;
