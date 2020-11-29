import React, {useState, useContext} from 'react';
import UpdatePassword from './UpdatePassword'

const Settings = () => {
  return (
    <div className="profile-forum-details">
      <section className="tabbed-content2">
        <div className="tabs2">
          <ul>
            <li><p className="active">General</p></li>
            <li><p>Email </p></li>
            {/*
              <li><a href="#Social">Social Accounts </a></li>
              <li><a href="#Profile">Profile Visibility</a></li>
              <li><a href="#Export">Export Data </a></li>
              <li><a href="#Delete">Delete Account</a></li>
              */}
          </ul>
        </div>
        <UpdatePassword />
      </section>
    </div>
  )
}

export default Settings;
