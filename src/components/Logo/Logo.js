import React from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <>
            <div className="logo">
                <Link to='/'><img src="/assets/img/logo.png" alt="Header Logo"/></Link> 
            </div>           
        </>
    )
}

export default Logo; 