import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';
import { connect, useDispatch } from 'react-redux';
import actions from '../../redux/schoolOpening/actions';
import { ReplyComment } from './ReplyComment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function DisplayPost(props) {
    const { posts } = props
    const [comments, setComments] = useState([]);
    const [commentTextarea, setCommentTextarea] = useState('');
    const {isAuthenicate, userData} = useContext(AuthStoreContext);
    const dispatch = useDispatch()

    useEffect(()=>{

    }, [comments])
    console.log('userData',userData)
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

        const resp = await axios.post(`/communities-feed/${id}/comments`, data, config); 

        if(resp.data.success) {            
            const result  = comments.concat(resp.data.data);
            props.handleNewComment(id, resp.data.data)
            setComments([...result]);        
        }
        // window.scrollTo(100, 0);        
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
        const resp = await axios.post(`/communities-feed/${postId}/comments/${commentId}`, data, config); 
        
        if(resp.data.success) {
            props.handleReplyComment(postId, commentId, data)
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
        axios.post(`/communities-feed/${id}/likes/`, config)
        .then(()=>{
            dispatch({
                type:actions.LIKE_FEED_POST,
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
        axios.post(`/communities-feed/${id}/reports/`, {report_id:id}, config)
        .then(()=>{
            Swal.fire({
                title: 'Post Reported',
                text: 'Your Report is send to the Admin we will review and take action accordingly! Thanks for your feedback',
                icon: 'success',
                // confirmButtonText: 'Cool'
              })
          })
        
    }

    return (
        <> 
        <div className='blog_sec1' key={posts._id}>
            <div className="blog_title">
                <div className="title_img">
                        <img src="assets/img/admin-img.png" alt=""/>
                    </div>
                <div className="user_des">
                    <h4>{posts.user.fullName}</h4>
                    <p>{posts.user.role}</p>
                </div>
                <div className="star_icon"><i className="fa fa-star-o" aria-hidden="true"></i></div>
                <div className="time"> <Moment fromNow>{posts.date}</Moment></div>
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


                <div className="blog_feedback clearfox">
                    <a href="#">
                        <div className="flower"><img src="assets/img/flower.svg" alt=""/>
                            <span>{comments.filter(comment => comment.post === posts._id).length + posts.comments.length}</span>
                        </div>                    
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

                {posts.comments
                .map(comment => (
                    <div>
                        <div className="blog_title" key={comment._id}>
                            <div className="title_img">
                                <img className='img-circle' src={comment.user.avatar === null ? '/assets/img/user-account.png'  : comment.user.avatar } alt=""/>
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
                        <div>
                            {
                                comment.replies.map(reply => (           
                                <div className="blog_title margin_right" key={reply._id}>                                
                                    <div className="title_img">
                                        <img className='img-circle' src={reply.user.avatar === null ? '/assets/img/user-account.png'  : reply.user.avatar } alt=""/>
                                    </div>
                                    <div className="user_des">
                                        <h4>{reply.user.fullName} <span>({reply.user.role})</span></h4>
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
                            ))
                        }     
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
                    </div>
                ))}
                {/* {comments
                .filter(comment => comment.post === posts._id)
                .map(comment => (
                    <div className="blog_title" key={comment._id}>
                        <div className="title_img">
                            <img className='img-circle' src={comment.user.avatar === null ? '/assets/img/user-account.png'  : comment.user.avatar } alt=""/>
                        </div>
                        <div className="user_des">
                            <h4>{comment.user.fullName} <span>({comment.user.role})</span></h4>
                            <p>{comment.content} </p>
                            <div className="replaied">
                                <div className="hour"><Moment fromNow>{comment.date}</Moment></div>
                            </div>
                        </div>
                        <div className="direct_cmnt_area reply_cmnt_area ml-auto" style={{marginBottom: '50px'}}>
                            <form  onSubmit={(e)=>replyCommentHandler(e, posts._id, comment._id)}>
                                <input type='hidden' name='though_id'  value={posts._id}/>
                                <textarea placeholder="Reply to comment" value={replyCommentArea} onChange={ (e) => setReplyCommentArea(e.target.value)} name='textarea'></textarea>
                                <input type="submit" value="Post"/>
                            </form>
                        </div>  
                    </div> 
                ))}  */}

                {isAuthenicate ? (
                    <>
                    <hr />
                    <div className="direct_cmnt_area" style={{marginBottom: '50px'}}>
                        <form onSubmit={postCommentHandler}>
                            <input type='hidden' name='though_id' value={posts._id}/>
                            <textarea placeholder="write a new comment" value={commentTextarea} onChange={ (e) => setCommentTextarea(e.target.value)} name='textarea'></textarea>
                            <input type="submit" value="Post"/>
                        </form>
                    </div>                                     
                    </>
                ) : null} 
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleReplyComment:(id, commentId, data)=>dispatch({
            type:actions.REPLY_COMMENT,
            payload:{
                id,
                commentId,
                data:{
                    _id:new Date().toTimeString(),
                    user:props.users.currentUser,
                    content:data.content,
                    date:new Date().getTime()
                }
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