import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { configureSocket } from "../../../utils/axiosInterceptor"
import { AuthStoreContext } from "../../../Store/AuthStore";
const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"

const FriendsList = () => {
  const { isAuthenicate, userData } = useContext(AuthStoreContext);
  const [list, setList] = useState([])
  useEffect(()=>{
    getRequestList()
  }, [])
  const getRequestList = ()=>{
    axios({
      method: 'get',
      url: '/users/friends/requests'
    }).then(resp=>{
      setList(resp.data.requests)
    })
  }
  const cancelRequest = request =>{
    axios({
      method: 'delete',
      url: '/users/friends/cancel',
      data: {request}
    }).then(res=>{
      console.log(res);
      getRequestList()
    })
  }

  const onAcceptFriendRequest = async (sender) => {
    if (userData?._id) {
      let soc = await configureSocket(baseUrl);
      soc.emit("accept-friend-request", ({sender}), ack => {
        return true
      })
      setTimeout(()=>{
        getRequestList()
      }, 4000)
    }
  }

  return (
      <div id="Friendship" className="item2 active" data-title="Friendships">
        <div className="item-content2">
          <div className="profile-forum-search">
            {/*
              <div className="short profile_short">
                <label>Order by:</label>
                <select>
                  <option value="all people" selected>
                    Last Active
                  </option>
                  <option value="all people">Last Active</option>
                </select>
              </div>
              */}
          </div>
          <div className="friends_inner_details clearfix">
            {
              list.map((f)=>(
                <div className="friends_inner_details_col clearfix">
                  <div className="friend-info">
                    <div className="friend-pro-image">
                      <img src={f.reqId.avatar || "assets/img/friend_request_Avtar_image_1.png"} alt="" />
                    </div>
                    <div className="friend-info-details">
                      <p href="#">{f.reqId.fullName} <span>{f.reqId.role ? `(${f.reqId.role})`:""}</span></p>
                      {/*<h4 className="active_status">Active Now</h4>*/}
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="friend-links">
                    <button className="btn btn-secondary" onClick={()=>cancelRequest(f.reqId)}>Cancel Request</button>
                    <button className="btn btn-primary" onClick={()=>onAcceptFriendRequest(f.reqId)}>Accept Request</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/*<div className="pager">Viewing 1 - 4 of 4</div>*/}
        </div>
      </div>
  );
};

export default FriendsList;
