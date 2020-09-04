import React, { useEffect } from 'react';
import MainMenu from '../MainMenu';
import SearchBox from '../SearchBox/SearchBox';
import Logo from '../Logo/Logo';
import { useStoreState } from 'easy-peasy';

const Header = () => {    

    const auth = useStoreState(state => state.islogin);

    useEffect(() => {
    }, []);

    return (
        <>
           <header className="page-header page-header-inner" id="page-header">
                <div className="bottom-header">
                    <div className="container clearfix">
                        <Logo/>

                        <div className="my_account">
                            <a href="/"  className="open-button">
                                {auth ? (
                                   <> <img src="assets/img/profile-image.png" alt="Sarah Jones"/> Sarah Jones <i className="icon-chevron-right"></i></>
                                ) : <><img src="/assets/img/user-account.png" alt="My Account Icon"/>My Account</> }
                            </a>
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