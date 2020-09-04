import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// // Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

function Register() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, SetRole] = useState('');
    const [acceptTermCond, setAcceptTermCond] = useState(false);
    const authStatus = useStoreState(state => state.islogin);
    const loginAction = useStoreActions(actions => actions.userLogin);
    
    useEffect(() => {

    }, []);

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            console.log(role);
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            var user = firebase.auth().currentUser;
            await user.updateProfile({ displayName: fullName });            
            await user.sendEmailVerification();
            await firebase.auth().signInWithEmailAndPassword(email, password);
            const auth = await firebase.auth();
            auth.onAuthStateChanged((user) => {
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
            console.log(error);
        }
    }

    return (
        <>
            {authStatus ? <Redirect to='/'/> : null}
            <section className="main_register">
                <div className="container-fluid">
                    <div className="main_register_area">
                        <h2>Registration</h2>
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
                        </form>
                    </div>
                </div>
            </section>            
        </>
    )
};

export default Register;