import React from 'react'
import MainMenu from '../MainMenu';
import SearchBox from '../SearchBox/SearchBox';
import Logo from '../Logo/Logo';

const Header = () => {
    return (
        <>
            <header className="page-header" id="page-header">
                <div className="bottom-header">
                    <div className="container clearfix">
                        <Logo/>
                        <div className="my_account">
                            <a href="/" className="open-button"><img src="/assets/img/user-account.png" alt="My Account Icon"/>My Account</a>
                        </div>
                        <div className="form-popup" id="myForm">
                            <form className="form-container">
                                <h2>Sign in</h2>

                                <label htmlFor="email">Name/Email</label>
                                <input type="text" name="email" required/>

                                <label htmlFor="psw">Password</label>
                                <input type="password" name="psw" required/>

                                <button type="submit" className="sign_in_btn">Sign In</button>
                                <ul className="newnd_forget">
                                    <li><a href="/">Create New Account?</a></li>
                                    <li><a href="/">Forget Password?</a></li>
                                </ul>
                                <a href="/" className="btn-with-facebook"><img src="assets/img/facebook.png" alt=""/>Continue With Facebook</a>
                                <a href="/" className="btn-with-google"><img src="assets/img/google.png" alt=""/>Continue With Google</a>
                                <button type="button" className="btn cancel">Close</button>
                            </form>
                        </div>

                        <div className="search-icon hidden-md-down"><i className="icon-search"></i></div>
                        <MainMenu/>
                    </div>
                </div>
                <SearchBox/>
            </header>
        </>
    )
}

export default Header;