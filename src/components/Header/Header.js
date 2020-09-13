import React, { useEffect, useState } from 'react';
import MainMenu from '../MainMenu';
import SearchBox from '../SearchBox/SearchBox';
import Logo from '../Logo/Logo';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Header = () => {    

    const auth = useStoreState(state => state.islogin);
    const logoutAction = useStoreActions(actions => actions.userLogout); 
   
    useEffect(() => {

    }, []);

    const logoutUser = (e) => {
        e.preventDefault();
        logoutAction();
        localStorage.clear();   
    };    

    return (
        <>
           <header className="page-header page-header-inner" id="page-header">
                <div className="bottom-header">
                    <div className="container clearfix">
                        <Logo/>

                        <div className='my_account active'>
                            {auth ? (
                                <> <img src="assets/img/user-account.png" alt="Sarah Jones"/> {
                                        jwt_decode(localStorage.getItem('jwt_token')).payload.fullname
                                    } <i className="icon-chevron-right"></i>

                                    <div class="my_account_open">
                                        <ul>                                         
                                            {jwt_decode(localStorage.getItem('jwt_token')).payload.role === 'Admin' ? 
                                                (<li><Link to="/create-covid-post">Create Covid Post</Link></li>)  : null
                                            }
                                            <li><Link to="/" onClick={logoutUser}>Lagout</Link></li>                                            
                                        </ul>
                                    </div>                                        
                                    </>
                            ) : 
                            (
                                <>
                                    <img src="/assets/img/user-account.png" alt="My Account Icon"/>
                                    <Link to="/login">My Account</Link>
                                </> 
                            )}
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