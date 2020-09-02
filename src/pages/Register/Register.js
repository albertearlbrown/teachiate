import React from 'react'

const Register = () => {
    return (
        <>
            <section class="main_register">
                <div class="container-fluid">
                    <div class="main_signin_area desk_hide">
                        <h2>Sign In</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Full Name</p>
                                        <input type="text" class="register_input" placeholder="" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Password</p>
                                        <input type="password" class="register_input" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="submit" class="register_submit" value="Sign In" name=""/>
                                </div>
                            </div>
                            <ul class="made_accnt">
                                <li><a href="/">Create New Account?</a></li>
                                <li><a href="/">Forget Password?</a></li>
                            </ul>
                            <div class="other_login">
                                <ul>
                                    <li class="btn-with-facebook"><a href="/"><img src="assets/img/facebook_login.png" alt=""/>Continue With Facebook</a></li>
                                    <li class="btn-with-google"><a href="/"><img src="assets/img/google_login.png" alt=""/>Continue With Google</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="main_register_area">
                        <h2>Registration</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="register_field_col">
                                        <p>Full Name</p>
                                        <input type="text" class="register_input" placeholder="sarah.jones@gmail.com" name=""/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="register_field_col">
                                        <p>Email</p>
                                        <input type="email" class="register_input" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="register_field_col">
                                        <p>Create Password</p>
                                        <input type="password" class="register_input" name=""/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="register_field_col">
                                        <p>Confirm Password</p>
                                        <input type="password" class="register_input" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Type of User</p>
                                        <form action="/" class="choose_field">
                                        <p>
                                            <input type="radio" id="test1" name="radio-group" checked/>
                                            <label for="test1">Parent</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="test2" name="radio-group"/>
                                            <label for="test2">Teacher</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="test3" name="radio-group"/>
                                            <label for="test3">Student</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="test4" name="radio-group"/>
                                            <label for="test4">General Educator</label>
                                        </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="register_terms_area">
                                <div class="new">
                                <form>
                                    <div class="form-group">
                                    <input type="checkbox" id="html"/>
                                    <label for="html">I accept the <a href="/">Terms And Conditions</a></label>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <input type="submit" class="register_submit" value="Submit" name=""/>
                        </div>
                    </div>
                    <div class="main_signin_area mob_hide">
                        <h2>Sign In</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Full Name</p>
                                        <input type="text" class="register_input" placeholder="" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Password</p>
                                        <input type="password" class="register_input" name=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="submit" class="register_submit" value="Sign In" name=""/>
                                </div>
                            </div>
                            <ul class="made_accnt">
                                <li><a href="/">Create New Account?</a></li>
                                <li><a href="/">Forget Password?</a></li>
                            </ul>
                            <div class="other_login">
                                <ul>
                                    <li class="btn-with-facebook"><a href="/"><img src="assets/img/facebook_login.png" alt=""/>Continue With Facebook</a></li>
                                    <li class="btn-with-google"><a href="/"><img src="assets/img/google_login.png" alt=""/>Continue With Google</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            
        </>
    )
};

export default Register;