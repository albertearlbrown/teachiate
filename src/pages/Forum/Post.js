import React, { useState, useEffect, useContext } from "react";
import Moment from "react-moment";
import axios from "axios";
import { AuthStoreContext } from "../../Store/AuthStore";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import {FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon} from "react-share";
import { configureSocket } from "../../utils/axiosInterceptor"

function Posts({ post }) {
  const [comments, setComments] = useState([]);
  const [commentTextarea, setCommentTextarea] = useState("");
  const [isLiked, setLiked] = useState(false)
  const [active, setActive] = useState(false)
  const [hashtags, setHashtags] = useState(false)
  const { isAuthenicate, userData } = useContext(AuthStoreContext);

  useEffect(()=>{
    try {
      if (document.getElementById('share_post_via'+post._id)) {
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
    } catch (e) {
      console.log("Warning");
    }

  },[post])

  useEffect(() => {
    const getHashtags = ()=>{
      let hashtag = ""
      if (post.tags.length>0) {
        post.tags.map((tag) => (hashtag += `#${tag.label} `))
      }
      debugger
      return setHashtags(hashtag)
    }
    getHashtags()
  },[])

  useEffect(() => {
    setLiked(post.likes.includes(userData?._id))
  }, [userData]);


  const postCommentHandler = async (e) => {
    e.preventDefault();
    setCommentTextarea("");
    const id = e.target[0].value;
    const content = e.target[1].value;
    const token = localStorage.getItem("jwt_token");

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const data = {
      content: content,
    };

    const resp = await axios.post(
      `/forum/${id}/comments`,
      data,
      config
    );

    if (resp.data.success) {
      Swal.fire({
        title: "Good job!",
        text: "Your comment successfully posted",
        icon: "success",
      });

      const result = comments.concat(resp.data.data);
      setComments([...result]);
    }
  };

  const likePost = async ()=>{
    if (userData?._id) {
      let socket = await configureSocket();
      socket.emit('like-post', {postId: post._id}, (ack)=>{
      })
      setLiked(!isLiked)
    }
  }

  return (
    <>
      <li className="forum_col" key={post._id}>
        <div className="forum_user_info">
          <div className="forum_col_avatar">
            <img
              src={
                post.user.avatar === null
                  ? "/assets/img/user-account.png"
                  : post.user.avatar
              }
              alt=""
              height="65"
            />
          </div>

          <div className="forum_avtar_info">
            <h2>
              {post.user.fullName} <span>({post.user.role})</span>
            </h2>
            <h3>
              {post.category} » {post.subcategory}
            </h3>
          </div>

          <div className="forum_col_content">
            <Link to={`/posts/${post._id}`} className="forum_title">
              {post.title}
            </Link>
            <p className="more">{post.description}</p>
            {post.tags.length > 0
              ? post.tags.map((tage) => (
                  <a href="#" style={{ marginRight: "10px" }} key={tage.key}>
                    #{tage.label}
                  </a>
                ))
              : null}
            <div className="comment_num">
              {comments.filter((comment) => comment.post === post._id).length +
                post.comments.length}{" "}
              Comments
            </div>
            <div className="post_time">
              <Moment fromNow>{post.date}</Moment>
            </div>
          </div>

          {post.image !== null ? (
            <div className="forum_col_image">
              <img src={post.image} alt="" />
            </div>
          ) : null}
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

            <div className="commentpost_open active">
              {post.comments.slice(0,2).map((comment) => (
                <div className="blog_title margin_btm" key={comment._id}>
                  <div className="title_img">
                    <img
                      src={
                        post.user.avatar === null
                          ? "/assets/img/user-account.png"
                          : post.user.avatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="user_des">
                    <h4>
                      {comment.user.fullName} <span>({comment.user.role})</span>
                    </h4>
                    <p>{comment.content}</p>
                    <div className="replaied">
                      <div className="hour">
                        <Moment fromNow>{post.date}</Moment>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {comments
                .filter((comment) => comment.post === post._id)
                .map((comment) => (
                  <div className="blog_title margin_btm" key={comment._id}>
                    <div className="title_img">
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          comment.user.avatar === null
                            ? "/assets/img/user-account.png"
                            : comment.user.avatar
                        }
                        alt=""
                      />
                    </div>
                    <div className="user_des">
                      <h4>
                        {comment.user.fullName}{" "}
                        <span>({comment.user.role})</span>
                      </h4>
                      <p>{comment.content} </p>
                      <div className="replaied">
                        <div className="hour">
                          <Moment fromNow>{comment.date}</Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {isAuthenicate ? (
                <div className="post_share single_post_comment">
                  <form onSubmit={postCommentHandler}>
                    <div className="post_share_area">
                      <div className="posted_avtar">
                        <img
                          src={
                            userData.avatar
                              ? userData.avatar
                              : "/assets/img/user-account.png"
                          }
                          alt={userData.fullname}
                        />
                      </div>
                      <div className="post_share_field">
                        <input type="hidden" value={post._id} name="post_id" />
                        <textarea
                          placeholder="Sarah What’s are your mind?"
                          value={commentTextarea}
                          onChange={(e) => setCommentTextarea(e.target.value)}
                        ></textarea>
                        <div className="share_option_right">
                          <input type="submit" value="Submit" name="" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </ul>
        </div>
      </li>
    </>
  );
}

export default Posts;
