import React from 'react'

const ProfileView = () => {
    return (
        <>
        <section className="profile-banner-section">
            <div className="container-fluid">
                {/* <!-- profile-banner --> */}
                <div className="profile-banner">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload2" accept=".png, .jpg, .jpeg" />
                            <label for="imageUpload2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Change Cover Image</label>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview2" style={{backgroundImage: `url('/assets/img/profile_banner.jpg')`}}>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- profile-banner --> */}
                {/* <!-- avatar-upload --> */}
                <div className="avatar-upload-section clearfix">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                            <label for="imageUpload"></label>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview" style={{backgroundImage: `url('assets/img/avatar.jpg')`}}>
                            </div>
                        </div>
                    </div>
                    <div className="avatar-info">
                        <div className="avatar-name">
                            <h3><a href="#">Sarah Jones  </a> </h3>
                            <h4>@Sarahjones</h4>
                            <div className="clear"></div>
                        </div>
                        <div className="avatar-status">
                            <h3>Teacher</h3>
                            <h4><span className="active"></span> Active </h4>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- avatar-upload --> */}
            </div>
        </section>


        {/* <!-- inner people page end end--> */}
        <section class="profile-details clearfix">
            <div class="container-fluid">
                {/* <!-- profile-left --> */}
                <div class="profile-left">
                    <div class="profile-wrapper">
                        <div class="profile-nav">
                            <ul class="clearfix">
                                <li class="active"><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/file.png" alt=""/>
                                       
                                    </div>
                                    <p>Activity</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon2.png" alt=""/>
                                    </div>
                                    <p>Profile</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon3.png" alt=""/>
                                    </div>
                                    <p>Notifications</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon4.png" alt=""/>
                                    </div>
                                    <p>Messages</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon5.png" alt=""/>
                                        <div class="profile-nav-notyfication">5</div>
                                    </div>
                                    <p> Friends</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon6.png" alt=""/>
                                    </div>
                                    <p> Groups</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon7.png" alt=""/>
                                    </div>
                                    <p>Forums</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon8.png" alt=""/>
                                    </div>
                                    <p>Media</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div class="profile-nav-icon">
                                        <img src="assets/img/icon9.png" alt=""/>
                                    </div>
                                    <p>Settings</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                   </div>                
                </div>
            </div>
        </section>
        </>
    )
};

export default ProfileView;