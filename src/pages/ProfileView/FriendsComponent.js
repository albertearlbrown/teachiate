import React, { useState, useEffect } from "react";
import axios from 'axios';

const FriendsList = () => {
  const [list, setList] = useState([])
  useEffect(()=>{
    getFriendList()
  }, [])
  const getFriendList = ()=>{
    axios({
      method: 'get',
      url: '/users/friends'
    }).then(resp=>{
      setList(resp.data.friends)
    })
  }
  const cancelFriendShip = friend =>{
    axios({
      method: 'delete',
      url: '/users/friends/remove',
      data: {friend}
    }).then(res=>{
      console.log(res);
      getFriendList()
    })
  }
  return (
    <div className="profile-forum-details friend_inner">
      <section className="tabbed-content2">
        <div className="tabs2">
          <ul>
            <li>
              <a href="#Friendship" className="active">
                Friendships
              </a>
            </li>
            <li>
              <a href="#Friend_request">Requests</a>
            </li>
          </ul>
        </div>
        <div id="Friendship" className="item2 active" data-title="Friendships">
          <div className="item-content2">
            <div className="profile-forum-search">
              <div className="short profile_short">
                <label>Order by:</label>
                <select>
                  <option value="all people" selected>
                    Last Active
                  </option>
                  <option value="all people">Last Active</option>
                </select>
              </div>
            </div>
            <div className="friends_inner_details clearfix">
              {
                list.map((f)=>(
                  <div key={f._id} className="friends_inner_details_col clearfix">
                    <div className="friend-info">
                      <div className="friend-pro-image">
                        <img src={f.avatar || "assets/img/friend_request_Avtar_image_1.png"} alt="" />
                      </div>
                      <div className="friend-info-details">
                        <a href="#">{f.fullName} <span>{f.role ? `(${f.role})`:""}</span></a>
                        {/*<h4 className="active_status">Active Now</h4>*/}
                      </div>
                      <div className="clear" />
                    </div>
                    <div className="friend-links">
                      <button className="btn btn-secondary" onClick={()=>cancelFriendShip(f)}>Cancel Friendship</button>
                      <button href="#" className="btn btn-primary">Report</button>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="pager">Viewing 1 - 4 of 4</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FriendsList;
