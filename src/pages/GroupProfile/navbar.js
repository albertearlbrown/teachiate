import React from "react";

const NavBar = ({setView, view}) =>
  <div className="profile-nav">
    <ul className="clearfix">
      <li className={view==='profile' && "active"} onClick={()=>setView('profile')}>
        <p>
          <div className="profile-nav-icon">
            <img src="/assets/img/icon2.png" alt />
          </div>
          <p>Profile</p>
        </p>
      </li>
      <li className={view==='members' && "active"} onClick={()=>setView('members')}>
        <p>
          <div className="profile-nav-icon">
            <img src="/assets/img/icon6.png" alt />
          </div>
          <p>Members</p>
        </p>
      </li>
      <li>
        <p>
          <div className="profile-nav-icon">
            <img src="/assets/img/icon4.png" alt />
          </div>
          <p>Invite</p>
        </p>
      </li>
      {/*
        <li>
          <a href="#">
            <div className="profile-nav-icon">
              <img src="/assets/img/icon8.png" alt />
            </div>
            <p>Media</p>
          </a>
        </li>
        */}
    </ul>
  </div>;
;

export default NavBar
