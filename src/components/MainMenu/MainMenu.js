import React from 'react'
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

function MainMenu() {
    
    const authState = useStoreState(state => state.islogin); 
    const logoutAction = useStoreActions(actions => actions.userLogout); 

    const logoutUser = (e) => {
        e.preventDefault();
        logoutAction();
        localStorage.clear();   
        window.location.replace("/");
    };

    return (
        <>
           <div className="page-header_main-menu">
                <nav className="nav-primary">
                    <ul className="menu-main-navigation menu clearfix">
                        <li className="menu-item-has-children"><Link to="/">Home</Link></li>
                        <li className="menu-item-has-children"><Link to="/about">About Us</Link></li>
                        <li className="menu-item-has-children"><Link to="/groups">Groups</Link></li>
                        <li className="menu-item-has-children"><Link to="/">Forums</Link></li>
                        <li className="menu-item-has-children"><Link to="/"> People</Link></li>
                        <li className="menu-item-has-children"><Link to="/"> Blogs</Link></li>
                        {authState ? <li className="menu-item-has-children"><Link to="/" onClick={logoutUser}> Logout</Link></li> : <></>}                        
                    </ul>
                </nav>
            </div>           
        </>
    )
}

export default MainMenu;