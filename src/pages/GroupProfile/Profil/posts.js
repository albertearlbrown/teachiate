import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import groupActions from "../../../redux/groups/actions";
import Moment from "react-moment";

const Posts = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: groupActions.GET_GROUP_POST,
      payload: { id: groups.group._id },
    });
  }, []);

  return (
    <>
      <div className="profile-forum-search forums_inner_page">
        <div className="short profile_short">
          <label>Sort by:</label>
          <div className="select">
            {/*
              <select name="slct" id="slct">
                <option value={1}>Last Active</option>
                <option value={2}>Last Active</option>
              </select>
              */}
          </div>
        </div>
      </div>

      <div className="friends_inner_details">
        {groups.posts.map((post) => (
          <div className="blog_sec1">
            <div className="star">
              <img src="/assets/img/star2.png" alt="start" />
            </div>
            <div className="blog_title">
              <div className="title_img">
                <img src={post.user.avatar || "/assets/img/user_icon.png"} alt="avatar" />
              </div>
              <div className="user_des">
                <h4>
                  {post.user.fullName} <span>({post.user.role})</span>
                </h4>
                <p>
                  posted an update in the group{" "}
                  <span>
                    {groups.group.groupName}{" "}
                    <img src="/assets/img/user_icon.png" alt="group-logo" />
                  </span>{" "}
                </p>
              </div>
              <div className="time"><Moment fromNow>{post.date}</Moment></div>
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
                  <a href="#">
                    {" "}
                    <span>
                      like{" "}
                      <i style={{marginLeft: 5}} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    {" "}
                    <span>
                      Comment{" "}
                      <i className="fa fa-comment-o" aria-hidden="true"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <span>
                      Share <i className="fa fa-share" aria-hidden="true" />
                    </span>
                  </a>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
