import React from 'react';

const ProfilNavBar = ({setView})=>{
  return(
    <div className="profile-nav">
        <ul className="clearfix">
            <li onClick={()=>setView('thoughts')}>
            <a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/file.png" alt="" />

                </div>
                <p>Activity</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon2.png" alt=""/>
                </div>
                <p>Profile</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon3.png" alt=""/>
                </div>
                <p>Notifications</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon4.png" alt=""/>
                </div>
                <p>Messages</p>
                </a>
            </li>
            <li className="active" onClick={()=>setView('friends')}>
              <a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon5.png" alt=""/>
                </div>
                <p> Friends</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon6.png" alt=""/>
                </div>
                <p> Groups</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon7.png" alt=""/>
                </div>
                <p>Forums</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon8.png" alt=""/>
                </div>
                <p>Media</p>
                </a>
            </li>
            <li><a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon9.png" alt=""/>
                </div>
                <p>Settings</p>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default ProfilNavBar
