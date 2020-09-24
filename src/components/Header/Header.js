import React, { useEffect, useState } from 'react';
import MainMenu from '../MainMenu';
import SearchBox from '../SearchBox/SearchBox';
import Logo from '../Logo/Logo';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Header = () => {    

    const auth = useStoreState(state => state.islogin);
    const userLogout = useStoreActions(actions => actions.userLogout); 
    const [user, setUser] = useState({ fullname: null, avatar: null, role: null });
    const [token, setToken] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('jwt_token')) {
            const token = localStorage.getItem('jwt_token');            
            setToken(token);
            const { fullname, avatar, role } = jwt_decode(token).payload;        
            setUser({ fullname, avatar: null, role });
        }
    }, []);

    const logoutUser = (e) => {
        e.preventDefault();
        userLogout();
        localStorage.clear();   
    };    

    return (
        <>
           <header className="page-header page-header-inner" id="page-header">
                <div className="bottom-header">
                    <div className="container clearfix">
                        <Logo/>
                                                  
                            {auth ? (
                                <>   
                                    <div className='my_account' id='my_account'> 
                                    
                                        {token ? (
                                            <>
                                                <img src={user.avatar ?  user.avatar : "/assets/img/user-account.png"} alt={user.fullname} />  
                                                {user.fullname ? user.fullname :  null}                                            
                                            </>
                                            ) : null
                                        } 

                                        <i className="icon-chevron-right"></i> 

                                        <div className="my_account_open">
                                            <ul>                                         
                                                {user.role === 'Admin' ? <li><Link to="/create-covid-post">Create Covid Post</Link></li>: null}
                                                <li><Link to='/my-profile'>My Profile</Link></li>
                                                <li><Link to="/" onClick={logoutUser}>Lagout</Link></li>                                            
                                            </ul>
                                        </div>                   
                                    </div>                     
                                </>
                            ) : 
                            (
                                <>
                                    <div className='my_account'>
                                        <Link to="/login">
                                            <img src="/assets/img/user-account.png" alt="My Account Icon"/>
                                        </Link>
                                        <Link to="/login">My Account</Link>
                                    </div>
                                </> 
                            )}

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