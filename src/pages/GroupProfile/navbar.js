import React from "react";

const NavBar = () =>
  <div className="profile-nav">
    <ul className="clearfix">
      <li className="active">
        <a href="#">
          <div className="profile-nav-icon">
            <img src="/assets/img/icon2.png" alt />
          </div>
          <p>Profile</p>
        </a>
      </li>
      <li>
        <a href="#">
          <div className="profile-nav-icon">
            <img src="/assets/img/icon6.png" alt />
          </div>
          <p>Members</p>
        </a>
      </li>
      <li>
        <a href="#">
          <div className="profile-nav-icon">
            <img src="/assets/img/icon4.png" alt />
          </div>
          <p>Invite</p>
        </a>
      </li>
      <li>
        <a href="#">
          <div className="profile-nav-icon">
            <img src="/assets/img/icon8.png" alt />
          </div>
          <p>Media</p>
        </a>
      </li>
    </ul>
  </div>;
;

export default NavBar
