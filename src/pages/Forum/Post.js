import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';
import Swal from 'sweetalert2';

function Posts({post}) {
    
    const [comments, setComments] = useState([]);
    const [commentTextarea, setCommentTextarea] = useState('');
    const {isAuthenicate, userData} = useContext(AuthStoreContext); 

    useEffect(() => {    

    }, []);

    
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

        const resp = await axios.post(`http://localhost:4000/forum/${id}/comments`, data, config); 

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
            <li className='forum_col' key={post._id}>
                <div className="forum_user_info">
                    <div className="forum_col_avatar">
                        <img src={post.user.avatar === null ? '/assets/img/user-account.png' : post.user.avatar} alt="" height='65'/>
                    </div>

                    <div className='forum_avtar_info'>
                        <h2>{post.user.fullName} <span>({post.user.role})</span></h2>     
                        <h3>{post.category} » {post.subcategory}</h3>                                                                                                                                           
                    </div>

                    <div className='forum_col_content'>
                        <a href="#" className="forum_title">{post.title}</a>
                        <p className='more'>{post.description}</p>
                        {post.tags.length > 0 ? post.tags.map(tage => (
                            <a href="#" style={{marginRight: '10px'}} key={tage.key}>#{tage.label}</a>
                        )): null}
                        <div className="comment_num">{comments.filter(comment => comment.post === post._id).length + post.comments.length} Comments</div>
                        <div className="post_time"><Moment fromNow>{post.date}</Moment></div> 
                    </div> 

                    {post.image !== null ? <div className="forum_col_image"><img src={post.image} alt=""/></div> : null}                    
                </div>                                                                                                                        

                <div className="comm_se">
                    <ul>
                        <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                        <li id="commentpost">
                            <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span>
                        </li>
                        <li><span>Share <i className="fa fa-share" aria-hidden="true"> 
                            </i></span>
                            <div className="share_post_via">
                                <ul>
                                    <li><a href="#"><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                    <li><a href="#"><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                    <li><a href="#"><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                </ul>
                            </div>
                        </li>  

                        <div className="commentpost_open active">
                            {post.comments.map(comment => (
                                <div className="blog_title margin_btm" key={comment._id}>
                                    <div className="title_img">
                                        <img src={post.user.avatar === null ? '/assets/img/user-account.png' : post.user.avatar } alt=""/>
                                    </div>
                                    <div className="user_des">
                                        <h4>{comment.user.fullName} <span>({comment.user.role})</span></h4>
                                        <p>{comment.content}</p>
                                        <div className="replaied">
                                            <div className="hour">
                                            <Moment fromNow>
                                                {post.date}
                                            </Moment>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {comments
                            .filter(comment => comment.post === post._id)
                            .map(comment => (
                                <div className="blog_title margin_btm" key={comment._id}>
                                    <div className="title_img">
                                        <img style={{borderRadius: '50%'}} src={comment.user.avatar === null ? '/assets/img/user-account.png'  : comment.user.avatar } alt=""/>
                                    </div>
                                    <div className="user_des">
                                        <h4>{comment.user.fullName} <span>({comment.user.role})</span></h4>
                                        <p>{comment.content} </p>
                                        <div className="replaied">
                                            <div className="hour"><Moment fromNow>{comment.date}</Moment></div>
                                        </div>
                                    </div>
                                </div> 
                            ))}                             

                            {isAuthenicate ? (
                            <div className="post_share single_post_comment">
                                <form onSubmit={postCommentHandler}>
                                    <div className="post_share_area">
                                        <div className="posted_avtar">
                                            <img src={userData.avatar ?  userData.avatar : "/assets/img/user-account.png"} alt={userData.fullname} /> 
                                        </div>
                                        <div className="post_share_field">
                                            <input type='hidden' value={post._id} name='post_id'/>
                                            <textarea placeholder="Sarah What’s are your mind?" value={commentTextarea} onChange={(e) => setCommentTextarea(e.target.value)}></textarea>
                                            <div className="share_option_right">
                                                <input type="submit" value="Submit" name=""/>
                                            </div>
                                        </div>
                                    </div>                  
                                </form>
                            </div>
                            ): null}

                        </div>               
                    </ul>
                </div>            
            </li>    
        </>
    );
}

export default Posts;