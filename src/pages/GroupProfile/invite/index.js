import React, { useState, useEffect } from "react";
import Moment from 'react-moment'
import groupActions from '../../../redux/groups/actions'
import axios from 'axios';

const Invites = ({ group, dispatch, currentUser }) => {
  const { members, requests } = group;
  const [membersList, setList] = useState(members);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [sort, setSort] = useState('date')
  useEffect(()=>{
    getUsers(1)
  },[])

  const getUsers = async (page) => {
    setOpen(true)
    axios({
      url: `/users/all`,
      method: 'get',
      params:{ page, sort, name: searchValue}
    }).then((response)=>{
      const { data } = response.data
      setUsers(data.users)
      setCurrentPage(data.page)
      const tt = Math.ceil(data.totalElement / data.limit)
      setTotalPages(tt)
      setOpen(false)
    }).catch((e)=>{
      setOpen(false)
      console.log(e);
    })
  }

  const sendInviation = (userId) => {
    axios({
      method: 'post',
      url: `/group/${group._id}/invitation/send`,
      data: { userId }
    }).then(()=>{
      dispatch({
        type: groupActions.LOAD_GROUP,
        payload: {id: group._id }
      })
      getUsers(currentPage)
    }).catch(()=>{
      console.log("error");
    })
  }

  const cancelInvitation = (userId) => {
    axios({
      method: 'post',
      url: `/group/${group._id}/invitation/cancel`,
      data: { userId }
    }).then(()=>{
      dispatch({
        type: groupActions.LOAD_GROUP,
        payload: {id: group._id }
      })
      getUsers(currentPage)
    }).catch(()=>{
      console.log("error");
    })
  }

  const isMember = (id)=>{
    if (members.find( m => m.memberId?._id === id)) {
      return null;
    }else if (requests.find(a=>a.member === id && a.type === 'SENT')) {
      return(
        <div className="friend-links">
          <p onClick={()=> cancelInvitation(id)} className="btn btn-secondary">
            Cancel Invitation
          </p>
        </div>
      )
    }else if (requests.find(a=>a.member === id && a.type === 'RECEIVED')) {
      return (
        <div className="friend-links">
          <p className="btn btn-secondary">
            Accept Invitation
          </p>
        </div>
      );
    } else {
      return(
        <div className="friend-links">
          <p onClick={()=> sendInviation(id)} className="btn btn-primary">
            Add To Invite
          </p>
        </div>
      )
    }
  }

  const getPagination = () => {
    const list = [];
    for (let i = 1; i <= totalPages; i++) {
      list.push(<li className={currentPage === ""+i?"selected":""}><span onClick={()=>getUsers(i)}>{i}</span></li>)
    }
    return list;
  }

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
          <input onChange={e=>setSearchValue(e.target.value)} type="search" placeholder="Search" className="form-control" />
          <button onClick={()=>getUsers(1)} className="search_btn" type="submit">
            <img src="/assets/img/search-icon.png" alt="avatar" />
          </button>
        </div>
        <div className="friends_inner_details clearfix">
          {/* friends_inner_details_col */}
          {users.map(user=>(
            <div key={user._id} className="friends_inner_details_col clearfix">
              <div className="friend-info">
                <div className="friend-pro-image">
                  <img src="/assets/img/friend_request_Avtar_image_1.png" alt="avatar" />
                </div>
                <div className="friend-info-details">
                  <a href="#">{user.fullName}</a>
                  <div className="group_member_info">
                    <h5>{user.role}</h5>
                    <h6><Moment fromNow>{user.date}</Moment></h6>
                  </div>
                </div>
                <div className="clear" />
              </div>
              {isMember(user._id)}
            </div>
          ))}
        </div>
        <ul className="pagination clearfix">
          {getPagination()}
        </ul>
      </div>
    </div>
  );
};

export default Invites;
