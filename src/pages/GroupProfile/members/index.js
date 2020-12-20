import React, { useState, useEffect} from "react";

const Members = ({group, dispatch, currentUser}) => {
  const { members } = group
  const [membersList, setList] = useState(members)
  const [search, setSearch] = useState('')

  const setSubmit = () => {
    const filter = members.filter(a => a.memberId.fullName.includes(search))
    setList(filter)
  }

  return (
    <div className="profile-forum-details">
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
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search" className="form-control" />
        <button className="search_btn" type="submit" onClick={()=> setSubmit(search)}>
          <img src="/assets/img/search-icon.png" alt="icon" />
        </button>
      </div>
      <div className="friends_inner_details clearfix">
        {
          membersList.map(member=>(
            <div className="friends_inner_details_col clearfix">
              <div className="friend-info">
                <div className="friend-pro-image">
                  <img src={member.memberId?.avatar || "/assets/img/friend_request_Avtar_image_1.png"} alt="avatar" />
                </div>
                <div className="friend-info-details">
                  <a href="#">{member.memberId.fullName}</a>
                  <div className="group_member_info">
                    <h5>{member.memberId.role}</h5>
                    <h6>12 hours ago</h6>
                  </div>
                </div>
                <div className="clear" />
              </div>
              <div className="friend-links">
                {currentUser.friends.indexOf(member.memberId._id)>=0 &&
                  <a href="#" className="btn btn-primary">
                    Add Friend
                  </a>
                }
              </div>
            </div>
          ))
        }
      </div>
      {membersList?.length && <div className="pager">Viewing 1 - {membersList?.length} of {membersList?.length}</div>}
    </div>
    </div>
  );
};

export default Members;
