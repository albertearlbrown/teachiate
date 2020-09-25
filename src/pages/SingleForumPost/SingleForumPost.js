import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SingleForumPost = () => {

    let { id } = useParams();
    const [load, setLoad] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/forum/${id}`);
            if(resp.data.success) {
                setPost(resp.data.data);
                setLoad(true);
            }
            else {
                window.location.replace('/');
            }
        }

        fetchPost();
    }, [])

    return (
            <>
            <section className="blog profile_mt clearfix">
                <div className="container">
                    <div className="blog_left single_forum_post">
                        {load ? (
                            <>
                                <div className="forum_title">
                                    <h2><span className="back_to_btn"><Link to="/forum"></Link></span>{post.title}</h2>
                                </div>             

                                <div className="blog_sec3">
                                    <div className="star"><img src="assets/img/star2.png" alt=""/></div>
                                    <div className="blog_title">
                                        <div className="title_img">
                                            <img src={post.avatar === null ? '/assets/img/user-account.png' : post.avatar} alt=""/>
                                        </div>
                                        <div className="user_des">
                                            <h4>{post.fullname} <span>({post.role})</span></h4>
                                            <p>posted an update </p>
                                        </div>
                                        <div className="time"> 
                                            <Moment fromNow>{post.created_at}</Moment>
                                        </div>
                                    </div>
                                    <div className="blog-sec4">
                                        <p>{post.description} </p>
                                    </div>
                                </div>  

{/* 
                                <div className="post_share single_post_comment">
                                    <div className="post_share_area">
                                        <div className="posted_avtar"><img src="assets/img/g4.png" alt=""/></div>
                                        <div className="post_share_field">
                                            <textarea placeholder="Sarah What’s are your mind?"></textarea>
                                            <div className="new">
                                            <form>
                                                <div className="form-group">
                                                <input type="checkbox" id="html5"/>
                                                <label htmlFor="html5"><span><img src="assets/img/noti_bell_icon.png" alt=""/></span> Notify me of follow-up replies via email</label>
                                                </div>
                                            </form>
                                            </div>
                                            <div className="share_option_right">
                                                <input type="submit" value="Submit" name=""/>
                                            </div>
                                        </div>
                                    </div>                  
                                </div>                                                                              */}
                            </>
                        ): <p>Loading...</p>}



                    </div>



                    <div className="blog_right">
                                              
                    </div>
                </div>
            </section>
        </>
    )
};

export default SingleForumPost;