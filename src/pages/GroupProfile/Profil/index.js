import React from "react";
import WhatsNew from './whatsnew';
import Posts from './posts'

const ProfileComponent = ({currentUser}) => {
  return (
    <div className="profile-forum-details favorites-details">
      <WhatsNew currentUser={currentUser} />
      <h2 className="sec_title">Recent Activity</h2>
      <Posts />
    </div>
  );
};

export default ProfileComponent;
