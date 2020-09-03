import React from 'react'

const Login = () => {
    return (
        <>
            <section className="main_register">
                <div className="container">
                    <div className="main_signin_area">
                        <h2>Sign In</h2>
                        <div className="register_field">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="register_field_col">
                                        <p>Email</p>
                                        <input type="text" className="register_input" placeholder="" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="register_field_col">
                                        <p>Password</p>
                                        <input type="password" className="register_input" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="submit" className="register_submit" value="Sign In" name=""/>
                                </div>
                            </div>
                            <ul className="made_accnt">
                                <li><a href="/">Create New Account?</a></li>
                                <li><a href="/">Forget Password?</a></li>
                            </ul>
                            <div className="other_login">
                                <ul>
                                    <li className="btn-with-facebook"><a href="/"><img src="/assets/img/facebook_login.png" alt=""/>Continue With Facebook</a></li>
                                    <li className="btn-with-google"><a href="/"><img src="/assets/img/google_login.png" alt=""/>Continue With Google</a></li>
                                    <li className="btn-with-apple"><a href="/"><img src="/assets/img/apple_login.png" alt=""/>Continue With Apple</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;