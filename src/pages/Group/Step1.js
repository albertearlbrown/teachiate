import React from 'react'

function Step2() {
    return (
        <>
            <div className="container">
                <div className="create_group">
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
                                        <div id="imagePreview2" style={{backgroundImage: `url(assets/img/create_group_dflt_cover.jpg )`}}>
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
                                    <div id="imagePreview" style={{backgroundImage: `url(assets/img/create_group_dflt_profile.png ;`}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add_group_info">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="register_field_col">
                                        <p>Group Name</p>
                                        <input type="text" placeholder="Enter Group name" className="register_input" name=""/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="only_field register_field_col">
                                        <p>Choose Privacy</p>
                                        <div className="select">
                                            <select name="slct" id="slct">
                                            <option selected disabled>Select Privecy</option>
                                            <option value="1">Public</option>
                                            <option value="2">Private</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="register_field_col">
                                        <p>Location</p>
                                        <input type="text" placeholder="Enter location" className="register_input" name=""/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="register_field_col">
                                        <p>Description</p>
                                        <textarea className="register_textarea" placeholder="Enter description"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                        <input type="submit" value="Continue" className="submit_grp_btn" name=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Step2;