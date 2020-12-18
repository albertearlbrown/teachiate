import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import groupActions from '../../../redux/groups/actions'

const WhatsNew = () => {
  const [content, setPost] = useState('')
  const groups = useSelector((state)=> state.groups)
  const dispatch = useDispatch()

  const createNewPost = () => {
    dispatch({
      type: groupActions.CREATE_NEW_POST,
      payload: {content, id: groups.group._id}
    })
  }
  return (
    <div className="post_share">
      <h2>What’s New?</h2>
      <div className="post_share_area">
        <div className="posted_avtar">
          <img src="/assets/img/g4.png" alt="g4" />
        </div>
        <div className="post_share_field">
          <textarea
            value={content}
            placeholder="Sarah What’s are your mind?"
            onChange={e => setPost(e.target.value)}
          />
          <div className="share_option_right">
            <input type="submit" defaultValue="Submit" name onClick={createNewPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
