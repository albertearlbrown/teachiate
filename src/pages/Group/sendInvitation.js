import React, { useContext, useState, useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://api.teachiate.com"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  text: {
    top: "50px",
    position: "relative",
    left: "-50px"
  },
  cover:{
    width: 73,
    height: 73,
    borderRadius: '50%'
  }
}));

function SendInvationComponent() {

  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedUsers, setSelectedUsers] = useState([])
  useEffect(()=>{
    getUsers(1)
  },[])

  const getUsers = async (page) => {
    setOpen(true)
    axios({
      url: `${baseUrl}/users/all`,
      method: 'get',
      params:{ page, name: searchValue, limit: 5}
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

  const addToInvite = user =>{
      setSelectedUsers([...selectedUsers, user])
  }

  const cancelInvation = user =>{
    let us = []
    for (var i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers[i].email !== user.email) {
        us.push(selectedUsers[i])
      }
    }
    setSelectedUsers(us)
  }

    return (
        <>
          <div className="profile-forum-details group_invite">
            <h2 className="sec_title">Members List</h2>
            <div className="profile-forum-search forums_inner_page">
            <div className="short profile_short">
                <label>Sort by:</label>
                <div className="select">
                  <select name="slct" id="slct">
                    <option value="1">Last Active</option>
                    <option value="2">Last Active</option>
                  </select>
                </div>
            </div>
            <div className="search_flex">
                <input type="search" placeholder="Search" className="form-control"/>
                <button className="search_btn" type="submit"><img src="assets/img/search-icon.png" alt=""/></button>
            </div>
            {selectedUsers.length > 0 &&
              <div className="choose_invitation">
                  <ul>
                    {selectedUsers.map((u, i)=>(<li key={i} onClick={()=> cancelInvation(u)}>{u.fullName}</li>))}
                  </ul>
                  <input type="submit" value="Send Invitations" className="invitation_send_btn" name=""/>
              </div>
            }

              <div className="friends_inner_details clearfix">
                {users.map((user, index) => {
                  return (
                    <div key={index} className="friends_inner_details_col clearfix">
                      <div className="friend-info">
                        <div className="friend-pro-image">
                          <img src={user.avatar} alt="dd" />
                        </div>
                        <div className="friend-info-details">
                          <div>{user.fullName}</div>
                          <div className="group_member_info">
                            <h5>{user.role}</h5>
                            {/*<h6>12 hours ago</h6>*/}
                          </div>
                        </div>
                        <div className="clear" />
                      </div>
                      <div className="friend-links">
                        {selectedUsers.findIndex(u=>u.email === user.email)>=0
                          ?
                            <div onClick={()=>cancelInvation(user)} className="btn btn-secondary ">
                              Cancel Invitation
                            </div>:
                            <div class="friend-links btn btn-primary" onClick={()=> addToInvite(user)}>
                                Add To Invite
                            </div>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="pager">Viewing {currentPage} - {totalPages} of {totalPages}</div>
            </div>
          </div>
        </>
    );
}

export default SendInvationComponent;
