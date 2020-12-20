import React, { useState, useEffect } from "react";

const Invites = ({ group, dispatch, currentUser }) => {
  const { members } = group;
  const [membersList, setList] = useState(members);
  const [search, setSearch] = useState("");

  const setSubmit = () => {
    const filter = members.filter((a) => a.memberId.fullName.includes(search));
    setList(filter);
  };

  return (
    <div className="profile-forum-details group_invite">
      <h2 className="sec_title">Members List</h2>
      <div className="profile-forum-search forums_inner_page">
        {/*
          <div className="short profile_short">
            <label>Sort by:</label>
            <div className="select">
              <select name="slct" id="slct">
                <option value={1}>Last Active</option>
                <option value={2}>Last Active</option>
              </select>
            </div>
          </div>
          */}
        <div className="search_flex">
          <input type="search" placeholder="Search" className="form-control" />
          <button className="search_btn" type="submit">
            <img src="/assets/img/search-icon.png" alt="avatar" />
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
                <img src="/assets/img/friend_request_Avtar_image_1.png" alt="avatar" />
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
                <img src="/assets/img/friend_request_Avtar_image_2.png" alt="avatar" />
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
                <img src="/assets/img/friend_request_Avtar_image_3.png" alt="avatar" />
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
                <img src="/assets/img/friend_request_Avtar_image_4.png" alt="avatar" />
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
  );
};

export default Invites;
