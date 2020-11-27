import React, { useEffect, useState, useContext } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import { AuthStoreContext } from '../../Store/AuthStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import calcalueDiffBetweenTwoDates from "../../utils/calculeDiffBetweenTwoDate"
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForumPostPage = (props) => {
  const { userData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(true)
  const [textareaComm, setCommentTextarea] = useState(null)
  const [currentUser, setCurrentUser] = useState(userData)

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
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    })
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
              <div className="star">
                <img src={"/assets/img/star2.png"} alt="image" />
              </div>
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
              <div className="cmnt_nmbr">{post.comments.length} Comments</div>
              {
                post.comments.map((comm)=>{
                  return (
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
                          {/*<div>Replied</div>*/}
                        </div>
                      </div>
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
                    placeholder="Sarah What’s are your mind?"
                    defaultValue={""}
                    value={textareaComm}
                    onChange={(e)=>setCommentTextarea(e.target.value)}
                  />
                  <div className="new">
                    <form>
                      {
                        /*
                        <div className="form-group">
                          <input type="checkbox" id="html5" />
                          <label htmlFor="html5">
                            <span>
                              <img src="assets/img/noti_bell_icon.png" alt="image" />
                            </span>{" "}
                            Notify me of follow-up replies via email
                          </label>
                        </div>
                        */
                      }
                    </form>
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