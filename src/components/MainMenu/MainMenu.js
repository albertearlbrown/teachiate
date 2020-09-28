import React from 'react'
import { Link } from 'react-router-dom';

function MainMenu() {

    return (
        <>
           <div className="page-header_main-menu">
                <nav className="nav-primary">
                    <ul className="menu-main-navigation menu clearfix">
                        <li className="menu-item-has-children"><Link to="/">Home</Link></li>
                        <li className="menu-item-has-children"><Link to="/opening-school-in-covid-siutation">School Opening</Link></li>                        
                        <li className="menu-item-has-children"><Link to="/groups">Groups</Link></li>
                        <li className="menu-item-has-children"><Link to="/people">People</Link></li>
                        <li className="menu-item-has-children"><Link to="/forum">Forum</Link></li>
                    </ul>
                </nav>
            </div>           
        </>
    )
}

export default MainMenu;