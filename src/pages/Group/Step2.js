import React from 'react'

function Step2() {
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
                        backgroundImage: "url(assets/img/profile_banner.jpg )",
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
                      style={{ backgroundImage: "url(assets/img/avatar.jpg )" }}
                    ></div>
                  </div>
                </div>
                <div className="avatar-info">
                  <div className="avatar-name">
                    <h3>
                      <a href="#">Homeschooling Gifted Children</a>{" "}
                    </h3>
                    <div className="clear" />
                  </div>
                  <div className="avatar-status">
                    <h3>Public</h3>
                    <h5>94 Members</h5>
                    <h6>Created 5 Months Ago</h6>
                    <div className="group-touch_area">
                      <p>Group Admins:</p>
                      <div className="admins_view">
                        <ul>
                          <li>
                            <a href="#">
                              <img src="assets/img/group_admin_1.png" alt />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="assets/img/katei-knapp.png" alt />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="assets/img/katei-girl.png" alt />
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
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type.
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
                <div className="profile-forum-details group_invite">
                  <h2 className="sec_title">Members List</h2>
                  <div className="profile-forum-search forums_inner_page">
                    <div className="short profile_short">
                      <label>Sort by:</label>
                      <div className="select">
                        <select name="slct" id="slct">
                          <option value={1}>Last Active</option>
                          <option value={2}>Last Active</option>
                        </select>
                      </div>
                    </div>
                    <div className="search_flex">
                      <input
                        type="search"
                        placeholder="Search"
                        className="form-control"
                      />
                      <button className="search_btn" type="submit">
                        <img src="assets/img/search-icon.png" alt />
                      </button>
                    </div>
                    <div className="choose_invitation">
                      <ul>
                        <li>John Smith</li>
                        <li>Nargess Demarco</li>
                      </ul>
                      <input
                        type="submit"
                        defaultValue="Send Invitations"
                        className="invitation_send_btn"
                        name
                      />
                    </div>
                    <div className="friends_inner_details clearfix">
                      {/* friends_inner_details_col */}
                      <div className="friends_inner_details_col clearfix">
                        <div className="friend-info">
                          <div className="friend-pro-image">
                            <img
                              src="assets/img/friend_request_Avtar_image_1.png"
                              alt
                            />
                          </div>
                          <div className="friend-info-details">
                            <a href="#">Jon Smith</a>
                            <div className="group_member_info">
                              <h5>General Educator</h5>
                              <h6>12 hours ago</h6>
                            </div>
                          </div>
                          <div className="clear" />
                        </div>
                        <div className="friend-links">
                          <a href="#" className="btn btn-secondary">
                            Cancel Invitation
                          </a>
                        </div>
                      </div>
                      {/* friends_inner_details_col */}
                      {/* friends_inner_details_col */}
                      <div className="friends_inner_details_col clearfix">
                        <div className="friend-info">
                          <div className="friend-pro-image">
                            <img
                              src="assets/img/friend_request_Avtar_image_2.png"
                              alt
                            />
                          </div>
                          <div className="friend-info-details">
                            <a href="#">Nargess Demarco</a>
                            <div className="group_member_info">
                              <h5>Teacher</h5>
                              <h6>12 hours ago</h6>
                            </div>
                          </div>
                          <div className="clear" />
                        </div>
                        <div className="friend-links">
                          <a href="#" className="btn btn-secondary">
                            Cancel Invitation
                          </a>
                        </div>
                      </div>
                      {/* friends_inner_details_col */}
                      {/* friends_inner_details_col */}
                      <div className="friends_inner_details_col clearfix">
                        <div className="friend-info">
                          <div className="friend-pro-image">
                            <img
                              src="assets/img/friend_request_Avtar_image_3.png"
                              alt
                            />
                          </div>
                          <div className="friend-info-details">
                            <a href="#">Kelley Anne Marking</a>
                            <div className="group_member_info">
                              <h5>Student</h5>
                              <h6>12 hours ago</h6>
                            </div>
                          </div>
                          <div className="clear" />
                        </div>
                        <div className="friend-links">
                          <a href="#" className="btn btn-primary">
                            Add To Invite
                          </a>
                        </div>
                      </div>
                      {/* friends_inner_details_col */}
                      {/* friends_inner_details_col */}
                      <div className="friends_inner_details_col clearfix">
                        <div className="friend-info">
                          <div className="friend-pro-image">
                            <img
                              src="assets/img/friend_request_Avtar_image_4.png"
                              alt
                            />
                          </div>
                          <div className="friend-info-details">
                            <a href="#">Katie Knapp</a>
                            <div className="group_member_info">
                              <h5>Parent</h5>
                              <h6>12 hours ago</h6>
                            </div>
                          </div>
                          <div className="clear" />
                        </div>
                        <div className="friend-links">
                          <a href="#" className="btn btn-primary">
                            Add To Invite
                          </a>
                        </div>
                      </div>
                      {/* friends_inner_details_col */}
                    </div>
                    <div className="pager">Viewing 1 - 4 of 4</div>
                  </div>
                </div>
                {/* profile-forum-details */}
              </div>
            </div>
          </section>
        </>
    );
}

export default Step2;
