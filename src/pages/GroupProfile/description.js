import React, { useEffect, useState } from "react";
import {FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon} from "react-share";
import Moment from "react-moment";
import Helmet from "react-helmet";
import groupActions from '../../redux/groups/actions';
import axios from 'axios'

const GroupDescription = ({group, isMember, currentUser, dispatch}) => {
  const [admins, setAdmins] = useState([])
  const [active, setActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [membershipType, setMembershipType] = useState('none')

  useEffect(()=>{
    try {
      if (group._id && document.getElementById('share_post_via'+group._id)) {
        window.addEventListener('click', function(e){
          if (document.getElementById('share_post_via'+group._id)?.contains(e.target)){
            console.log("clicked in");
            setActive(true)
          } else{
            console.log("clicked out");
            setActive(false)
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },[group])

  useEffect(()=>{
    const findAdmins = ()=>{
      if (group.members) {
        const filter = group.members.filter((a)=> a.isAdmin === true)
        const find = filter.find(a => a.memberId._id === currentUser._id)
        setIsAdmin(find ? true: false);
        if (group.members.find((a)=> a.memberId._id === currentUser._id)) {
          setMembershipType('member')
        }else if (group.requests.find((a)=> a.member === currentUser._id)) {
          setMembershipType('waiting')
        }else {
          setMembershipType('none')
        }
        setAdmins(filter)
      }
    }
    findAdmins()
  },[group])

  const sendInviation = () => {
    axios({
      method: 'post',
      url: `/group/${group._id}/invitation/send`,
      data: { userId: currentUser._id }
    }).then(()=>{
      dispatch({
        type: groupActions.LOAD_GROUP,
        payload: {id: group._id }
      })
    }).catch(()=>{
      console.log("error");
    })
  }
  const leaveGroup = () => {
    axios({
      method: 'post',
      url: `/group/${group._id}/invitation/leave`,
      data: { userId: currentUser._id }
    }).then(()=>{
      window.location.reload()
    }).catch(()=>{
      console.log("error");
    })
  }
  const cancelInvitation = () => {
    axios({
      method: 'post',
      url: `/group/${group._id}/invitation/cancel`,
      data: { userId: currentUser._id }
    }).then(()=>{
      dispatch({
        type: groupActions.LOAD_GROUP,
        payload: {id: group._id }
      })
    }).catch(()=>{
      console.log("error");
    })
  }

  return (
    <section className="profile-banner-section profile_view">
      <Helmet>
        {/* General tags */}
        <title>{group.name}</title>
        <meta name="description" content={group.description} />
        {/* OpenGraph tags */}
        <meta name="og:url" content={window.location.href} />
        <meta name="og:title" content={group.name} />
        <meta name="og:description" content={group.description} />
        <meta name="og:image" content={group.cover} />
        <meta name="og:type" content="website" />
        <meta name="fb:app_id" content={"1640321232815333"} />
        {/* Twitter Card tags */}
        <meta name="twitter:title" content={group.title} />
        <meta name="twitter:description" content={group.description} />
        <meta name="twitter:image" content={group.cover} />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <div className="container-fluid">
        {/* profile-banner */}
        <div className="profile-banner">
          <div className="avatar-upload">
            <div className="avatar-preview">
              <div
                id="imagePreview2"
                style={{
                  backgroundImage: `url(${group.cover || '/assets/img/profile_banner.jpg'})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="avatar-upload-section clearfix">
          <div className="avatar-upload">
            <div className="avatar-preview">
              <div
                id="imagePreview"
                style={{ backgroundImage: `url(${group.avatar || '/assets/img/avatar.jpg'})` }}
              ></div>
            </div>
          </div>
          <div className="avatar-info">
            <div className="avatar-name">
              <h3>
                <a href="#">{group.groupName}</a>{" "}
              </h3>
              <div className="clear" />
            </div>
            <div className="avatar-status">
              <h3>{group.privacy === 'PRIVATE' ? 'Private': 'Public'}</h3>
              <h5>{group.members?.length ? `${group.members?.length} Members`:'0 Members'}</h5>
              <h6>Created <Moment fromNow>{group.creationDate}</Moment></h6>
              <div className="group-touch_area">
                <p>Group Admins:</p>
                <div className="admins_view">
                  <ul>
                    {admins.map(ad =>
                    <li>
                      <a href="#">
                        <img src={ad?.memberId?.avatar||"/assets/img/group_admin_1.png"} alt />
                      </a>
                    </li>
                    )}
                  </ul>
                </div>
                <div className="grp_extra_btn">
                  <ul>
                    <li>
                      {!isAdmin &&
                        <>
                          {membershipType === 'member' && <p onClick={()=>leaveGroup()}>Leave Group</p>}
                          {membershipType === 'none' && <p onClick={()=>sendInviation()}>Join Group</p>}
                          {membershipType === 'waiting' && <p onClick={()=>cancelInvitation()}>Cancel Invitation</p>}
                        </>
                      }
                    </li>
                    <li>
                      <a href="#">Report</a>
                    </li>
                  </ul>
                  <div className="comm_se" style={{width: 200, padding: 0}}>
                    <div id={"share_post_via"+group._id} className={active&&'active'}>
                      <p>
                        <span>
                          <div className="share_group"></div>
                        </span>
                      </p>
                      <div className={"share_post_via "}>
                        <ul>
                          <li>
                            <FacebookShareButton
                              url={`${window.location.origin}/groups/${group._id}`}
                              quote={group.groupName}
                              hashtag={"#teachiate"}
                              disabledStyle
                              >
                                <span>
                                  <i className="fa fa-facebook-square">
                                    <FacebookIcon size={16} />
                                  </i>
                                </span>
                                Facebook
                            </FacebookShareButton>
                          </li>
                          <li>
                            <EmailShareButton
                              url={`${window.location.origin}/groups/${group._id}`}
                              subject={`${currentUser.fullName} shared with you a group (${group.groupName}) from teachiate`}
                              body={`${group.content}`}
                              disabledStyle
                            >
                              <span>
                                <i className="fa fa-facebook-square">
                                  <EmailIcon size={16} />
                                </i>
                              </span>
                              Email
                            </EmailShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              url={`${window.location.origin}/groups/${group._id}`}
                              title={group.groupName}
                              hashtag={"#teachiate"}
                              disabledStyle
                            >
                              <span>
                                <i className="fa fa-facebook-square">
                                  <TwitterIcon size={16} />
                                </i>
                              </span>
                              Twitter
                            </TwitterShareButton>
                          </li>
                        </ul>
                      </div>
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
            {group.description}
          </p>
        </div>
        {/* avatar-upload */}
      </div>
    </section>
  );
};

export default GroupDescription;
