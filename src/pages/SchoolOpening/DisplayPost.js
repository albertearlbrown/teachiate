import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';
import { ReplyComment } from './ReplyComment';
import actions from '../../redux/schoolOpening/actions';
import { connect, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function DisplayPost({posts, ...props}) {

    const dispatch = useDispatch()
    const [comments, setComments] = useState([]);
    const [commentTextarea, setCommentTextarea] = useState('');
    const {isAuthenicate, userData} = useContext(AuthStoreContext);
    const token = localStorage.getItem('jwt_token');

    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    };

    const postCommentHandler = async (e) => {
        e.preventDefault();
        setCommentTextarea('');
        const id = e.target[0].value;
        const content = e.target[1].value;
        const data = {
            content: content
        };          

        const resp = await axios.post(`/school-opening-updates/${id}/comments`, data, config); 

        if(resp.data.success) {
            
            const result  = comments.concat(resp.data.data);
            setComments([...result]);        
        }        
    }
    const replyCommentHandler = async (e, postId, commentId) => {
        e.preventDefault()
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
        const resp = await axios.post(`/school-opening-updates/${postId}/comments/${commentId}`, data, config); 
        
        if(resp.data.success) {
            console.log(resp)
            props.handleReplyComment(postId, commentId, resp.data.data)
        }
        // window.scrollTo(100, 0);   

        else if(posts.user.role === 'Student') {
            return 'blog_sec2';
        }
    }
    const controlLikeButton = (id) => {
        const token = localStorage.getItem('jwt_token');
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        axios.post(`/community/${id}/likes/`, config)
        .then(()=>{
            dispatch({
                type:actions.LIKE_COMMUNITY_POST,
                payload:{
                    id,
                    userId:userData._id
                }
            })
        })     
    }
    const reportPost = (id) => {
        const token = localStorage.getItem('jwt_token');
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        axios.post(`/community/${id}/reports/`, {report_id:id}, config)
        .then(()=>{
            Swal.fire({
                title: 'Post Reported',
                text: 'Your Report is send to the Admin we will review and take action accordingly! Thanks for your feedback',
                icon: 'success',
                // confirmButtonText: 'Cool'
              })
          })
        
    }
    // React.useEffect(
    //     ()=>{
    //         axios.post(
    //             '/school-opening-updates/5fb9583784aa613b844a26f7/comments/5fbdc1bc46b8f31ca50a5476',
    //             {content:"Hi"}, 
    //             config
    //             )
    //         .then((data)=>console.log('replyComment', data)).catch((err)=>console.log("replyComment err", err))
    //     },
    //     []
    // )
    const colors = () => {
        if(posts.user.role === 'Admin') {
            return 'blog_sec1';
        }

        else if(posts.user.role === 'Student') {
            return 'blog_sec2';
        }
        else {
            return 'blog_sec3';            
        }
    }    

    return (
        <> 
            <div className={colors()} key={posts._id}>
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
                        <div className="love"><img src="assets/img/love.svg" alt=""/><span>{posts?.likes?.length}</span></div>
                    </a>
                </div>                                          

                <div className="comm_se">
                    <ul>
                        <li>
                            <span onClick={()=>controlLikeButton(posts._id)}>
                                {posts.likes.includes(userData._id) ? "Liked" : 'Like'} 
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                            </span>
                        </li>
                        <li> <a href="#"> <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                        <li> <a href="#"> <span>Share <i className="fa fa-share" aria-hidden="true"></i>
                                </span></a></li>
                        <li> 
                            <span onClick={()=>reportPost(posts._id)}>
                                Report 
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            </span>
                        </li>
                    </ul>                
                </div>

                {posts.comments.map(comment => (
                    <div>
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
                                    {comment.replies.length > 0 ? <div>Replied</div> : null}
                                </div>
                            </div>
                        </div>

                        {comment.replies.map(reply => (           
                            <div className="blog_title margin_right" key={reply._id}>                                
                                <div className="title_img">
                                    <img className='img-circle' src={(reply.user?.avatar === null)  ? '/assets/img/user-account.png'  : reply.user?.avatar } alt=""/>                                
                                    </div>

                                <div className="user_des">
                                    <h4>{reply.user?.fullName} <span>{reply.user?.role}</span></h4>
                                    <p>{reply.content}</p>
                                    <div className="replaied">
                                        <div className="hour">
                                            <Moment fromNow>
                                                {reply.date}
                                            </Moment>                                            
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        ))} 
                            {isAuthenicate ?
                                <ReplyComment comment={comment} posts={posts} replyCommentHandler={replyCommentHandler} />
                                // <div className="direct_cmnt_area reply_cmnt_area ml-auto" style={{marginBottom: '50px'}}>
                                //     <form  onSubmit={(e)=>replyCommentHandler(e, posts._id, comment._id)}>
                                //         <input type='hidden' name='though_id'  value={posts._id}/>
                                //         <textarea placeholder="Reply to comment" value={replyCommentArea} onChange={ (e) => setReplyCommentArea(e.target.value)} name='textarea'></textarea>
                                //         <input type="submit" value="Post"/>
                                //     </form>
                                // </div>
                                :null
                            }
                    </div>
                ))}

                {comments
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
                ))}               

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
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleReplyComment:(id, commentId, data)=>dispatch({
            type:actions.REPLY_COMMENT_SCHOOL,
            payload:{
                id,
                commentId,
                data:data
            }
    }),
    handleNewComment:(id, data)=>dispatch({
        type:actions.NEW_COMMENT,
        payload:{
            id,
            data
        }
    })
}
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayPost)
