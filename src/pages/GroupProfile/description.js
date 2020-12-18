import React, { useEffect, useState } from "react";
import Moment from "react-moment";

const GroupDescription = ({group}) => {
  const [admins, setAdmins] = useState([])
  useEffect(()=>{
    const findAdmins = ()=>{
      if (group.members) {
        const filter = group.members.filter((a)=> a.isAdmin === true)
        setAdmins(filter)
      }
    }
    findAdmins()
  },[group])
  return (
    <section className="profile-banner-section profile_view">
      <div className="container-fluid">
        {/* profile-banner */}
        <div className="profile-banner">
          <div className="avatar-upload">
            <div className="avatar-preview">
              <div
                id="imagePreview2"
                style={{
                  backgroundImage: `url(${group.cover || '/assets/img/profile_banner.jpg'})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="avatar-upload-section clearfix">
          <div className="avatar-upload">
            <div className="avatar-preview">
              <div
                id="imagePreview"
                style={{ backgroundImage: `url(${group.avatar || '/assets/img/avatar.jpg'})` }}
              ></div>
            </div>
          </div>
          <div className="avatar-info">
            <div className="avatar-name">
              <h3>
                <a href="#">{group.groupName}</a>{" "}
              </h3>
              <div className="clear" />
            </div>
            <div className="avatar-status">
              <h3>{group.privacy === 'PRIVATE' ? 'Private': 'Public'}</h3>
              <h5>{group.members?.length ? `${group.members?.length} Members`:'0 Members'}</h5>
              <h6>Created <Moment fromNow>{group.creationDate}</Moment></h6>
              <div className="group-touch_area">
                <p>Group Admins:</p>
                <div className="admins_view">
                  <ul>
                    {admins.map(ad =>
                    <li>
                      <a href="#">
                        <img src={ad?.memberId?.avatar||"/assets/img/group_admin_1.png"} alt />
                      </a>
                    </li>
                    )}
                  </ul>
                </div>
                <div className="grp_extra_btn">
                  <ul>
                    <li>
                      <a href="#">Leave Group</a>
                    </li>
                    <li>
                      <a href="#">Report</a>
                    </li>
                  </ul>
                  <div className="share_group">
                    <div className="share_group_open">
                      <ul>
                        <li>
                          <a href="#">
                            <span>
                              <i className="fa fa-facebook-square" />
                            </span>
                            Facebook
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span>
                              <i className="fa fa-twitter" />
                            </span>
                            Twitter
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span>
                              <i className="fa fa-instagram" />
                            </span>
                            Instagram
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear" />
            </div>
          </div>
        </div>
        <div className="group_short_info">
          <h2>Description:</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type.
          </p>
        </div>
        {/* avatar-upload */}
      </div>
    </section>
  );
};

export default GroupDescription;
