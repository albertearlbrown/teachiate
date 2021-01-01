import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import groupActions from "../../../redux/groups/actions";
import Moment from "react-moment";
import Post from './post'

const Posts = () => {
  const { groups, currentUser } = useSelector((state) => {
    return {
      groups: state.groups,
      currentUser: state.users.currentUser,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: groupActions.GET_GROUP_POST,
      payload: { id: groups.group._id },
    });
  }, [groups.group._id]);

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
          <Post key={post._id} post={post} currentUser={currentUser} group={groups.group} dispatch={dispatch} />
        ))}
      </div>
    </>
  );
};

export default Posts;
