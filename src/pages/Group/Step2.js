import React from 'react'

function Step2() {
    return (
        <>
            <div className="container">
                <div className="create_group step_2">
                    <h2>Create Group</h2>
                    <div className="create_group_area">
                        <div className="add_banner_group">
                            <h3>Select Cover Photo</h3>
                            <div className="profile-banner">
                                <div className="avatar-upload">
                                    <div className="avatar-edit">
                                        <input type='file' id="imageUpload2" accept=".png, .jpg, .jpeg" />
                                        <label for="imageUpload2"></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview2" style={{backgroundImage: `url('assets/img/create_group_dflt_cover.jpg')`}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="avatar-upload group_profile_image">
                                <div className="avatar-edit">
                                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                                    <label for="imageUpload"></label>
                                </div>
                                <div className="avatar-preview">
                                    <div id="imagePreview" style={{backgroundImage: `url('assets/img/create_group_dflt_profile.png')`}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add_group_info_view">
                            <div className="group_info_view_area">
                                <div className="only_group_info">
                                    <div className="group_avatar_info">
                                        <h3>Public Speaking</h3>
                                        <h4>Bengalore, India</h4>
                                    </div>
                                    
                                    <div className="group_status">
                                        <h3>Public</h3>
                                        <h4>1 Members</h4>
                                        <h5>Created 5 Months Ago</h5>
                                    </div>
                                    <div className="group-touch_area">
                                        <p>Group Admin:</p>
                                        <div className="admins_view">
                                            <ul>
                                                <li><a href="#"><img src="assets/img/group_admin_1.png" alt=""/></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="group_share_area">
                                    <div className="add_member">Add Members</div>
                                    <div className="share_group">
                                            <span>Share</span> 
                                            <div className="share_group_open">
                                                <ul>
                                                    <li><a href="#"><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                                    <li><a href="#"><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                                    <li><a href="#"><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="group_post_share_area">
                            <div className="post_share">
                                <h2>Create A Post</h2>
                                <div className="post_share_area">
                                    <div className="posted_avtar"><img src="assets/img/g4.png" alt=""/></div>
                                    <div className="post_share_field">
                                        <textarea placeholder="Sarah What’s on your mind?"></textarea>
                                        <div className="adv_post_opt clearfix">
                                            <div className="share_type">
                                                <ul>
                                                    <li>
                                                        <div className="share_type_col">
                                                            <input type='file' id="imageUpload3" accept=".png, .jpg, .jpeg" />
                                                            <label for="imageUpload3"><span><img src="assets/img/upload_photo_icon.png" alt=""/></span>Photos</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="share_type_col">
                                                            <input type='file' id="imageUpload5" accept=".mp4, .flv" />
                                                            <label for="imageUpload5"><span><img src="assets/img/upload_video_icon.png" alt=""/></span>Video</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="share_option_right">
                                            <input type="submit" value="Post" name=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    ); 
}

export default Step2;