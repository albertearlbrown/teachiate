import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';
import Swal from 'sweetalert2';

function DisplayPost({posts}) {

    const [comments, setComments] = useState([]);
    const [commentTextarea, setCommentTextarea] = useState('');
    const {isAuthenicate, userData} = useContext(AuthStoreContext);

    const postCommentHandler = async (e) => {
        e.preventDefault();
        setCommentTextarea('');
        const id = e.target[0].value;
        const content = e.target[1].value;
        const token = localStorage.getItem('jwt_token');

        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        const data = {
            content: content
        };          

        const resp = await axios.post(`/school-opening-updates/${id}/comments`, data, config); 

        if(resp.data.success) {
            
            Swal.fire({
                title: 'Good job!',
                text: 'Your comment successfully posted',
                icon : 'success'
            });

            const result  = comments.concat(resp.data.data);
            setComments([...result]);        
        }        
    }

    return (
        <> 
            <div className='blog_sec4'>
                <div className='opeing_list'>
                    <div className="blog_title">
                    <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                    <div className="user_des">
                        <h4>{posts.user.fullName} ({posts.user.role})</h4>
                        <p>{posts.state} | USA </p>
                    </div>
                    <div className="time"> <Moment fromNow>{posts.date}</Moment></div>
                    <div className="star_icon"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                </div>
                
                {posts.filepath !== null ? (
                    <div className="blog_img_holder1"><img src={posts.image} alt=""/></div>
                )  : null}

                <div className="blog_des">
                    <div className="admin_details">
                        <div className="haeding">
                            <h4>{posts.title}</h4>
                        </div>
                    </div>
                    <p>{posts.content}</p>
                </div>


                <div className="opening_flex">
                    <div className="locaton">
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> State: <span>{posts.state}</span></p>
                        <p>City: <span>{posts.city}</span></p>
                    </div>
                    <div className="bbc_news">
                        <p><a href={posts.source}>Source</a></p>
                    </div>
                </div>  

                <div className="blog_feedback clearfox">
                    <a href="#">
                        <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>{posts.total_comments}</span></div>
                    </a>
                    <a href="#">
                        <div className="love"><img src="assets/img/love.svg" alt=""/><span>{posts.total_likes}</span></div>
                    </a>
                </div>                                          

                <div className="comm_se">
                    <ul>
                        <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                        <li> <a href="#"> <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                        <li> <a href="#"> <span>Share <i className="fa fa-share" aria-hidden="true"></i>
                                </span></a></li>
                        <li> <a href="#"> <span>Report <i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                    </ul>                
                </div>

                {/* {posts.comments.map(comment => (
                    <div className="blog_title" key={comment._id}>
                        <div className="title_img">
                            <img className='img-circle' src={comment.user.avatar === null ? '/assets/img/user-account.png' : comment.user.avatar } alt=""/>
                        </div>
                        <div className="user_des">
                            <h4>{comment.user.fullName} <span>({comment.user.role})</span></h4>
                            <p>{comment.content}</p>
                            <div className="replaied">
                                <div className="hour">
                                <Moment fromNow>
                                    {comment.date}
                                </Moment>
                                </div> 
                            </div>
                        </div>
                    </div>
                ))} */}

                {/* {comments
                .filter(comment => comment.post === posts._id)
                .map(comment => (
                    <div className="blog_title" key={comment._id}>
                        <div className="title_img">
                            <img className='img-circle' src={comment.user.avatar === null ? '/assets/img/user-account.png'  : comment.user.avatar } alt=""/>
                        </div>
                        <div className="user_des">
                            <h4>{comment.user.fullName} <span>({comment.user.role})</span></h4>
                            <p style={{marginBottom: '0px'}}>{comment.content} </p>
                            <div className="replaied">
                                <div className="hour"><Moment fromNow>{comment.date}</Moment></div>
                            </div>
                        </div>
                    </div> 
                ))}                */}

                {isAuthenicate ? (
                    <>
                    <div className="direct_cmnt_area" style={{marginBottom: '50px'}}>
                        <form onSubmit={postCommentHandler}>
                            <input type='hidden' name='though_id' value={posts._id}/>
                            <textarea placeholder="write a comment" value={commentTextarea} onChange={ (e) => setCommentTextarea(e.target.value)} name='textarea'></textarea>
                            <input type="submit" value="Post"/>
                        </form>
                    </div>                                     
                    </>
                ) : null}                    
                </div> 
            </div>
        </>
    )
}

export default DisplayPost;