import React, { useEffect, useState, useContext } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import { AuthStoreContext } from '../../Store/AuthStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import calcalueDiffBetweenTwoDates from "../../utils/calculeDiffBetweenTwoDate"
import { Link } from 'react-router-dom';
import { configureSocket } from "../../utils/axiosInterceptor"
import Moment from "react-moment";
import {FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon} from "react-share";
import axios from 'axios';

const ForumPostPage = (props) => {
  const { userData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(true)
  const [textareaComm, setCommentTextarea] = useState(null)
  const [currentUser, setCurrentUser] = useState(userData)
  const [isLiked, setLiked] = useState(false)
  const [showReplyTextArea, setShowReplyTextArea] = useState()
  const [active, setActive] = useState(false)
  const [hashtags, setHashtags] = useState(false)
  const [textareaSubComm, setSubCommentTextarea] = useState(null)

  useEffect(()=>{
    if (post._id && document.getElementById('share_post_via'+post._id)) {
      window.addEventListener('click', function(e){
        if (document.getElementById('share_post_via'+post._id).contains(e.target)){
          console.log("clicked in");
          setActive(true)
        } else{
          console.log("clicked out");
          setActive(false)
        }
      });
    }
  },[post])

  useEffect(() => {

  },[])

  useEffect(()=>{
    setCurrentUser(userData)
  },[userData])

  useEffect(() => {
    getPostInfos()
  }, []);

  const getPostInfos = ()=>{
    axios({
      method: 'get',
      url:`/forum/${props?.match?.params?.id}`
    }).then((response)=>{
      const {data} = response.data
      setPost(data)
      getHashtags(data)
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    })
  }

  const getHashtags = (p)=>{
    let hashtag = ""
    if (p.tags.length>0) {
      p.tags.map((tag) => (hashtag += `#${tag.label} `))
    }
    debugger
    return setHashtags(hashtag)
  }


  const likePost = async ()=>{
    if (userData?._id) {
      let socket = await configureSocket();
      socket.emit('like-post', {postId: post._id}, (ack)=>{
      })
      setLiked(!isLiked)
    }
  }

  const createComment = ()=>{
    const data = {
      content: textareaComm
    }
    axios({
      method:'post',
      url: `/forum/${post._id}/comments`,
      data
    }).then((response)=>{
      getPostInfos()
      setCommentTextarea("")
    }).catch(()=>console.log("error"))
  }

  const makePostTracked = (tracked)=>{
    if (userData?._id) {
      axios({
        method:'post',
        url: `/forum/${post._id}/tracked?tracked=${!tracked}`,
      }).then((response)=>{
        getPostInfos()
      }).catch(()=>console.log("error"))
    }
  }

  const createSubComment = (commentId)=>{
    const data = {
      content: textareaSubComm,
      commentId
    }
    axios({
      method:'post',
      url: `/forum/${post._id}/subcomment`,
      data
    }).then((response)=>{
      getPostInfos()
      setSubCommentTextarea("")
      setShowReplyTextArea(null)
    }).catch(()=>console.log("error"))
  }

  if (loading) {
    return(
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
  return (
    <div className="blog profile_mt clearfix">
      <div className="container">
        {post &&
          <div className="blog_left single_forum_post">
            <div className="forum_title">
              <h2>
                <span className="back_to_btn">
                  <Link to="/forum" />
                </span>
                {post.title}
              </h2>
              {/*
                <div className="subcs_area">
                  <a href="#">Subscribe</a>
                  <div className="add_fav" />
                </div>
                */}
            </div>
            <div className="blog_sec3">
              {
                userData?._id &&
                <div className="star" onClick={()=>makePostTracked(post.tracked.find(a=> a === userData._id))}>
                  <img src={post.tracked.find(a=> a === userData._id)?"/assets/img/star.png":"/assets/img/star2.png"} alt="image" />
                </div>
              }
              <div className="blog_title">
                <div className="title_img">
                  <img src={post.user.avatar || "/assets/img/user-account.png"} alt="image" />
                </div>
                <div className="user_des">
                  <h4>
                    {post.user.fullName} <span>({post.user.role})</span>
                  </h4>
                  <p>posted an update </p>
                </div>
                <div className="time"> {calcalueDiffBetweenTwoDates(new Date(post.date))} ago</div>
              </div>
              <div className="blog-sec4">
                <p>
                  {post.description}{" "}
                </p>
                <div className="forum_col_image">
                  <img src={post.image} alt="" />
                </div>
              </div>
              <div className="comm_se">
                <ul>
                  <li>
                    <p onClick={()=>likePost()}>
                      <span>
                        {isLiked?` ${post.likes.length - 1>0?`Liked with ${post.likes.length - 1} others`:'Liked'}`:`${post.likes.length} Like`}
                        <i style={{marginLeft: 5}} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                      </span>
                    </p>
                  </li>
                  <li id="commentpost">
                    <span>
                      Comment <i className="fa fa-comment-o" aria-hidden="true"></i>
                    </span>
                  </li>
                  <li id={"share_post_via"+post._id} className={active&&'active'}>
                    <span>
                      Share <i className="fa fa-share" aria-hidden="true"></i>
                    </span>
                    <div className="share_post_via">
                      <ul>
                        <li>
                          <FacebookShareButton
                            url={`${window.location.origin}/posts/${post._id}`}
                            quote={post.title}
                            hashtag={hashtags}
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
                            url={`${window.location.origin}/posts/${post._id}`}
                            subject={post.title}
                            body={`${post.description}`}
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
                            url={`${window.location.origin}/posts/${post._id}`}
                            title={post.title}
                            hashtag={hashtags}
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
                  </li>
                </ul>
              </div>
              <div className="cmnt_nmbr">{post.comments.length} Comments</div>
              {
                post.comments.map((comm)=>{
                  return (
                    <div>
                      <div className="blog_title margin_btm">
                        <div className="title_img">
                          <img src={comm.user.avatar || "/assets/img/user-account.png"} alt="image" />
                        </div>
                        <div className="user_des">
                          <h4>
                            {comm.user.fullName} <span>({comm.user.role})</span>
                          </h4>
                          <p>
                            {comm.content}{" "}
                          </p>
                          <div className="replaied">
                            <div className="hour">{calcalueDiffBetweenTwoDates(new Date(comm.date))} ago</div>
                            <div onClick={()=> setShowReplyTextArea(comm._id)}>Replied</div>
                          </div>
                        </div>
                      </div>
                      {
                        comm.subComment && comm.subComment?.map((sub)=>(
                          <div className="blog_title margin_right">
                            <div className="title_img">
                              <img src={sub.user.avatar || "/assets/img/katei-girl.png"} alt="" />
                            </div>
                            <div className="user_des">
                              <h4>{sub.user.fullName} <span>({sub.user.role})</span></h4>
                              <p>{sub.content}</p>
                              <div className="replaied">
                                <div className="hour">
                                  <Moment fromNow>{sub.date}</Moment>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                      {
                        showReplyTextArea === comm._id &&
                        <div className="">
                          <div className="post_share_subcomment_area">
                            <div className="posted_avtar">
                              <img src={currentUser.avatar || "/assets/img/user-account.png"} alt="image" />
                            </div>
                            <div className="post_share_field">
                              <textarea
                                placeholder="..."
                                defaultValue={""}
                                value={textareaSubComm}
                                onChange={(e)=>setSubCommentTextarea(e.target.value)}
                              />
                              <div className="new">
                              </div>
                              <div className="share_option_right">
                                <input type="submit" defaultValue="Submit" name onClick={()=>createSubComment(comm._id)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  )
                })
              }
            </div>
            <div className="post_share single_post_comment">
              <div className="post_share_area">
                <div className="posted_avtar">
                  <img src={currentUser.avatar || "/assets/img/user-account.png"} alt="image" />
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
          </div>
        }
      </div>
    </div>
  );
};

export default ForumPostPage;
