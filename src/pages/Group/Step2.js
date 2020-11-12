import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthStoreContext } from '../../Store/AuthStore';
import SendInvationComponent from "./sendInvitation"

function Step2() {
  const {newGroup, userData} = useContext(AuthStoreContext)
  debugger
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  useEffect(()=>{
    const diffInMonths = (created) => {
      const d = new Date(created)
       var timeDiff = Math.abs(new Date().getTime() - d.getTime());
       let months = Math.round(timeDiff / (2e3 * 3600 * 365.25));
       let days = null;
       if (months === 0 ) {
         days = Math.round(timeDiff / (1e3 * 3600 * 365.25))
       }
       setDays(days)
       setMonths(months)
    }
    diffInMonths(newGroup.creationDate)
  },[])

  if (newGroup.groupName) {
    return <Redirect to="/groups" />
  }

    return (
        <>
          <section className="profile-banner-section profile_view">
            <div className="container-fluid">
              {/* profile-banner */}
              <div className="profile-banner">
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    <div
                      id="imagePreview2"
                      style={{
                        backgroundImage: `url(${newGroup.cover})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* profile-banner */}
            {/* avatar-upload */}
            <div className="container">
              <div className="avatar-upload-section clearfix">
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{ backgroundImage: `url(${newGroup.avatar})` }}
                    ></div>
                  </div>
                </div>
                <div className="avatar-info">
                  <div className="avatar-name">
                    <h3>
                      <a href="#">{newGroup.groupName}</a>{" "}
                    </h3>
                    <div className="clear" />
                  </div>
                  <div className="avatar-status">
                    <h3>{newGroup.privacy}</h3>
                    <h5>{newGroup.members?.length} Members</h5>
                    <h6>{months>0?`Created ${months} Months Ago`:`Created ${days} Months Ago`}</h6>
                    <div className="group-touch_area">
                      <p>Group Admins:</p>
                      <div className="admins_view">
                        <ul>
                          <li>
                            <a href="#">
                              <img src={userData.avatar} alt />
                            </a>
                          </li>
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
                  {newGroup.description}
                </p>
              </div>
              {/* avatar-upload */}
            </div>
          </section>
          <section className="profile-details clearfix">
            <div className="container">
              <div className="profile-wrapper">
                <div className="profile-nav">
                  <ul className="clearfix">
                    <li>
                      <a href="#">
                        <div className="profile-nav-icon">
                          <img src="assets/img/icon2.png" alt />
                        </div>
                        <p>Profile</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="profile-nav-icon">
                          <img src="assets/img/icon6.png" alt />
                        </div>
                        <p>Members</p>
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">
                        <div className="profile-nav-icon">
                          <img src="assets/img/icon4.png" alt />
                        </div>
                        <p>Invite</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="profile-nav-icon">
                          <img src="assets/img/icon8.png" alt />
                        </div>
                        <p>Media</p>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* profile-forum-details */}
                <SendInvationComponent />
                {/* profile-forum-details */}
              </div>
            </div>
          </section>
        </>
    );
}

export default Step2;
