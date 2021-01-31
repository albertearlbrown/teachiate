import React, { useEffect, useState } from "react";
import {FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon} from "react-share";
import groupActions from "../../../redux/groups/actions";
import Moment from "react-moment";

const Post = ({post, group, currentUser, dispatch}) => {

  const [textareaComm, setCommentTextarea] = useState()
  const [showTextAreaComm, setShowTextAreaComm] = useState(false)
  const [active, setActive] = useState(false)
  const [numberOfComments, setNOF] = useState(1)

  useEffect(()=>{
    if (post._id && document.getElementById('share_post_via'+post._id)) {
      window.addEventListener('click', function(e){
        if (document.getElementById('share_post_via'+post._id)?.contains(e.target)){
          console.log("clicked in");
          setActive(true)
        } else{
          console.log("clicked out");
          setActive(false)
        }
      });
    }
  },[post])

  const likePost = (post) => {
    dispatch({
      type: groupActions.LIKE_POST,
      payload: { groupId: group._id, postId: post._id },
    });
  };

  const makePostTracked = (post) => {
    dispatch({
      type: groupActions.MAKE_POST_TRACKED,
      payload: { groupId: group._id, postId: post._id },
    });
  };

  const createComment = () => {
    dispatch({
      type: groupActions.CREATE_POST_COMMENT,
      payload: { groupId: group._id, postId: post._id, content: textareaComm },
    });
    setShowTextAreaComm(false)
    setCommentTextarea("")
  }

  return (
    <>
      <div className="blog_sec1" key={post._id}>
        <div className="star" onClick={() => makePostTracked(post)}>
          {post.tracked.find((a) => a === currentUser._id) ? (
            <img src="/assets/img/star.png" alt="start" />
          ) : (
            <img src="/assets/img/star2.png" alt="start" />
          )}
        </div>
        <div className="blog_title">
          <div className="title_img">
            <img
              src={post.user.avatar || "/assets/img/user-account.png"}
              alt="avatar"
            />
          </div>
          <div className="user_des">
            <h4>
              {post.user.fullName} <span>({post.user.role})</span>
            </h4>
          </div>
          <div className="time">
            <Moment fromNow>{post.date}</Moment>
          </div>
        </div>
        {post.image && (
          <div className="blog_img_holder1">
            <img src={post.image} alt="post" />
          </div>
        )}
        <div className="blog_des">
          <p>{post.content}</p>
        </div>
        {/*
      <div className="blog_feedback clearfox">
        <a href="#">
          <div className="flower">
            <img src="assets/img/flower.svg" alt />
            <span>25</span>
          </div>
        </a>
        <a href="#">
          <div className="love">
            <img src="assets/img/love.svg" alt />
            <span>12</span>
          </div>
        </a>
      </div>
      */}
        <div className="comm_se">
          <ul>
            <li>
              <p onClick={() => likePost(post)}>
                <span>
                  {`${post.likes.length} Likes`}
                  <i
                    style={{
                      marginLeft: 5,
                      color:
                        post.likes.indexOf(currentUser._id) >= 0
                          ? "rgb(7,143,210)": "rgba(0,0,0,0.5)",
                    }}
                    className="fa fa-thumbs-up"
                    aria-hidden="true"
                  ></i>
                </span>
              </p>
            </li>
            <li>
              <p onClick={() => setShowTextAreaComm(true)}>
                {" "}
                <span>
                  Comment{" "}
                  <i className="fa fa-comment" aria-hidden="true"></i>
                </span>
              </p>
            </li>
            <li id={"share_post_via"+post._id} className={active&&'active'}>
              <p >
                {" "}
                <span>
                  Share <i className="fa fa-share" aria-hidden="true" />
                </span>
                <div className="share_post_via">
                  <ul>
                    <li>
                      <FacebookShareButton
                        url={`${window.location.origin}/groups/${group._id}`}
                        quote={post.content}
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
                        subject={`${currentUser.fullName} shared with you a post from teachiate`}
                        body={`${post.content}`}
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
                        title={post.content}
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
              </p>
            </li>
            <li>
              {" "}
              <a href="#">
                {" "}
                <span>
                  Report{" "}
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          </ul>

          {
            post.comments.sort((a,b)=>a.date >= b.date ? -1:1).slice(0, numberOfComments).map(comm=>(
              <div>
                <div className="blog_title margin_btm">
                  <div className="title_img">
                    <img src={comm.user.avatar || "/assets/img/user-account.png"} alt="avatar" />
                  </div>
                  <div className="user_des">
                    <h4>
                      {comm.user.fullName} <span>({comm.user.role})</span>
                    </h4>
                    <p>
                      {comm.content}{" "}
                    </p>
                    <div className="replaied">
                      <Moment fromNow>{comm.date}</Moment>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          {post.comments.length > numberOfComments && <p style={{cursor: 'pointer'}} onClick={()=>setNOF(numberOfComments + 8)}>Load more comments</p>}
          {
            showTextAreaComm &&
            <div className="post_share single_post_comment">
              <div className="post_share_area">
                <div className="posted_avtar">
                  <img src={currentUser.avatar || "/assets/img/user-account.png"} alt="avatar" />
                </div>
                <div className="post_share_field">
                  <textarea
                    placeholder="..."
                    defaultValue={""}
                    value={textareaComm}
                    onChange={(e)=>setCommentTextarea(e.target.value)}
                  />
                  <div className="new">
                  </div>
                  <div className="share_option_right">
                    <input type="submit" defaultValue="Submit" name onClick={()=>createComment()} />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Post;
