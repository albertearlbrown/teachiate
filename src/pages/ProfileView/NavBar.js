import React from 'react';

const ProfilNavBar = ({setView, view})=>{
  return(
    <div className="profile-nav">
        <ul className="clearfix">
            <li onClick={()=>setView('thoughts')} className={view === "thoughts" && "active"}>
                <div className="profile-nav-icon">
                    <img src="assets/img/file.png" alt="" />

                </div>
                <p>Activity</p>
            </li>
            <li onClick={()=>setView('profilEdit')} className={view === "profilEdit" && "active"}>
              <p>
                <div className="profile-nav-icon">
                    <img src="assets/img/icon2.png" alt=""/>
                </div>
                <p>Profile</p>
              </p>
            </li>
            <li onClick={()=>setView('messages')} className={view === "messages" && "active"}>
              <p>
                <div className="profile-nav-icon">
                    <img src="assets/img/icon4.png" alt=""/>
                </div>
                <p>Messages</p>
              </p>
            </li>
            <li className={view === "friends" && "active"}  onClick={()=>setView('friends')}>
                <div className="profile-nav-icon">
                    <img src="assets/img/icon5.png" alt=""/>
                </div>
                <p> Friends</p>
            </li>
            <li className={view === "groups" && "active"}  onClick={()=>setView('groups')}>
                <div className="profile-nav-icon">
                    <img src="assets/img/icon6.png" alt=""/>
                </div>
                <p> Groups</p>
            </li>
            {/*
              <li><a href="#">
                  <div className="profile-nav-icon">
                      <img src="assets/img/icon7.png" alt=""/>
                  </div>
                  <p>Forums</p>
                  </a>
              </li>
              */}
            <li>
              <a href="#">
                <div className="profile-nav-icon">
                    <img src="assets/img/icon8.png" alt=""/>
                </div>
                <p>Media</p>
                </a>
            </li>
            <li className={view === "settings" && "active"} onClick={()=>setView('settings')}>
              <div className="profile-nav-icon">
                  <img src="assets/img/icon9.png" alt=""/>
              </div>
              <p>Settings</p>
            </li>
        </ul>
    </div>
  )
}

export default ProfilNavBar
