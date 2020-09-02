import React from 'react'

const SearchBox = () => {
    return (
        <>
            <div className="nav-fixed hidden-lg clearfix">
                <ul className="clearfix">

                    <li>
                        <div className="search-icon">
                            <span className="icon-search"></span> Search
                        </div>
                    </li>
                    <li>
                        <div className="toggle-menu">
                            <span className="icon-menu"></span> menu
                        </div>
                    </li>
                </ul>
            </div>

            <div className="search-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-push-2">
                            <div className="search-content">
                                <input type="text" placeholder="Search"/>
                                <input type="submit" value="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default SearchBox;