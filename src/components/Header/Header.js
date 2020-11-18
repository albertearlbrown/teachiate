import React, { useEffect, useContext } from "react";
import MainMenu from "../MainMenu";
import SearchBox from "../SearchBox/SearchBox";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { AuthStoreContext } from "../../Store/AuthStore";

function Header() {
  const { isAuthenicate, userData } = useContext(AuthStoreContext);

  useEffect(() => {}, []);

  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      <header className="page-header page-header-inner" id="page-header">
        <div className="bottom-header">
          <div className="container clearfix">
            <Logo />

            {isAuthenicate ? (
              <>
                <div className="my_account" id="my_account">
                  <img
                    src={
                      userData.avatar === null
                        ? "/assets/img/user-account.png"
                        : userData.avatar
                    }
                    alt={userData.fullname}
                  />
                  {userData.fullName}
                  <i className="icon-chevron-right"></i>
                  <div className="my_account_open">
                    <ul>
                      <li>
                        <Link to="/create-group-step-1">Create Group</Link>
                      </li>
                      <li>
                        <Link to="/my-profile">My Profile</Link>
                      </li>
                      <li>
                        <Link to="/" onClick={logoutUser}>
                          Lagout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="my_account">
                  <Link to="/login">
                    <img
                      src="/assets/img/user-account.png"
                      alt="My Account Icon"
                    />
                  </Link>
                  <Link to="/login">My Account</Link>
                </div>
              </>
            )}

            <div className="search-icon hidden-md-down">
              <i className="icon-search"></i>
            </div>
            <MainMenu />
          </div>
        </div>
        <SearchBox />
      </header>
    </>
  );
}

export default Header;
