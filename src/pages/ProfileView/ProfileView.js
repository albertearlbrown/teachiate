import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Moment from 'react-moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InfiniteLoader from 'react-infinite-loader';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const ProfileView = ({userData}) => {
    const [postData, setPostData] = useState([]);
    const [newPost, setNewPost] = useState([]);
    const [description, setDescription] = useState('');
    const [load, setLoad] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectFileUploadStart, setSelectFileUploadStart]  = useState(false);  
    const [selectFileUploadProgress, setSelectedFileUploadProgress]  = useState(0); 
    const [token, setToken] = useState('');
    const [startPost, setStartPost] = useState(0);
    const [LoadMoreFeedBtn, setLoadMoreFeedBtn] = useState(false);    

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchPosts() {

            const user_id = jwt_decode(localStorage.getItem('jwt_token')).payload.user_id;

            const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/thoughts/users/${user_id}`, {
                params: {
                    from: startPost,
                    to: 2
                }
            });
            if(resp.data.success === true) {
                setStartPost(2);
                setPostData([...resp.data.data]);        
                setLoad(true);
                setLoadMoreFeedBtn(true);
            }
            else {
                setLoadMoreFeedBtn(false);                
            }
        }

        fetchPosts();

        if(localStorage.getItem('jwt_token')) {
            setToken(localStorage.getItem('jwt_token'));
        }        
    }, []);

    const fileHandler = async (e) => {
        setSelectedFile(e.target.files[0]);       
    };

    const formHandler = async (e) => {
        e.preventDefault();           

        var filepath = null;

        if(selectedFile !== null) {
            const data = new FormData()
            data.append('file', selectedFile);

            const options = {
                onUploadProgress : (progressEvent) => {
                    const {loaded, total}  =  progressEvent;
                    const percentage = Math.floor(loaded * 100 / total);
                    setSelectFileUploadStart(true);
                    setSelectedFileUploadProgress(percentage);
                }
            }

            const resp =  await axios.post("https://teachiate-backend.fnmotivations.com/upload", data, options); 
            if(resp.data.success === true) { 
                var filepath = resp.data.filePath;
            }
        }   

        const data = {
            description,
            filepath
        }

        const resp = await axios.post('https://teachiate-backend.fnmotivations.com/thoughts', data, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        if(resp.data.success === true) {          
            setSelectedFile(null);
            setDescription('');      
            var x = resp.data.data.insertId;
            const createPost = await axios.get(`https://teachiate-backend.fnmotivations.com/thoughts/${x}`);
            if(createPost.data.success) {
                const data =  newPost.concat([...createPost.data.data]);
                setNewPost([...data]);
            }                  
        }   
    }

    const loadMoreArticles = async () => {
        const user_id = jwt_decode(localStorage.getItem('jwt_token')).payload.user_id;
        setStartPost(startPost + 2);        
        const from = startPost + 2;

        const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/thoughts/users/${user_id}`, {
            params: {
                from: from,
                to: 2
            }
        });
        if(resp.data.success === true) {
            const data =  postData.concat([...resp.data.data]);
            setPostData([...data]);        
        }    
                
        else {
            setLoadMoreFeedBtn(false);
        }
    };    

    const LinearProgressWithLabel = (props) => {
        return (
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
    }

    const fileExtension = (fileName) => {        
       var extension = fileName.split('.').pop();
       return extension;
    }

    const postMedia = (filepath) => {

        if(filepath) {
            const extension = fileExtension(filepath);
        
            if(extension === 'mp4') {
                return (
                    <video width="100%" height="100%" controls>
                        <source src={filepath} type="video/mp4"/>
                    </video>                
                );
            }
    
            else if(extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
                return (
                    <div className="blog_img_holder1"><img src={filepath} alt=""/></div>
                );
            }
        }

    }
    

    return (
        <>              
        <section className="profile-banner-section">
            <div className="container-fluid">
                {/* <!-- profile-banner --> */}
                <div className="profile-banner">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload2" accept=".png, .jpg, .jpeg" />
                            <label htmlFor="imageUpload2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Change Cover Image</label>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview2" style={{backgroundImage: `url('/assets/img/profile_banner.jpg')`}}>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- profile-banner --> */}
                {/* <!-- avatar-upload --> */}
                <div className="avatar-upload-section clearfix">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                            <label htmlFor="imageUpload"></label>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview" style={userData.avatar === null ?  {backgroundImage: `url('/assets/img/placeholder/user.png')`} : {backgroundImage: `url('${userData.avatar}')`}}>
                            </div>
                        </div>
                    </div>
                    <div className="avatar-info">
                        <div className="avatar-name">
                            <h3><a href="#">{userData.fullname} </a> </h3>
                            <div className="clear"></div>
                        </div>
                        <div className="avatar-status">
                            <h3>{userData.role}</h3>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- avatar-upload --> */}
            </div>
        </section>


        {/* <!-- inner people page end end--> */}
        <section className="profile-details clearfix">
            <div className="container-fluid">
                {/* <!-- profile-left --> */}
                <div className="profile-left">
                    <div className="profile-wrapper">
                        <div className="profile-nav">
                            <ul className="clearfix">
                                <li className="active"><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/file.png" alt=""/>
                                       
                                    </div>
                                    <p>Activity</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon2.png" alt=""/>
                                    </div>
                                    <p>Profile</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon3.png" alt=""/>
                                    </div>
                                    <p>Notifications</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon4.png" alt=""/>
                                    </div>
                                    <p>Messages</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon5.png" alt=""/>
                                        <div className="profile-nav-notyfication">5</div>
                                    </div>
                                    <p> Friends</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon6.png" alt=""/>
                                    </div>
                                    <p> Groups</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon7.png" alt=""/>
                                    </div>
                                    <p>Forums</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon8.png" alt=""/>
                                    </div>
                                    <p>Media</p>
                                    </a>
                                </li>
                                <li><a href="#">
                                    <div className="profile-nav-icon">
                                        <img src="assets/img/icon9.png" alt=""/>
                                    </div>
                                    <p>Settings</p>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="post_share">
                        <h2>Share your thoughts</h2>
                        <div className="post_share_area">
                            <div className="posted_avtar">
                                <img src={userData.avatar == null ? "assets/img/user-account.png" : userData.avatar} alt="Sarah Jones"/>
                            </div>
                            <form method="POST" encType="multipart/form-data" onSubmit={formHandler}>
                                <div className="post_share_field">
                                    <textarea placeholder="What’s are your mind?" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    <div className="adv_post_opt clearfix">
                                        <div className="share_type">
                                            <ul>
                                                <li>
                                                    <div className="share_type_col">
                                                        <input type='file' name="file" id="imageUpload3" accept=".png, .jpg, .jpeg"  onChange={fileHandler}/>
                                                        <label htmlFor="imageUpload3"><span><img src="assets/img/upload_photo_icon.png" alt=""/></span>Photos</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="share_type_col">
                                                        <input type='file'  name="file"  id="imageUpload5" accept=".mp4, .flv"  onChange={fileHandler}/>
                                                        <label htmlFor="imageUpload5"><span><img src="assets/img/upload_video_icon.png" alt=""/>
                                                        </span>Video</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="share_option_right">
                                        {/* <h4>Post In:</h4> */}
                                        <input type="submit" value="Post" name=""/>                                                                                   
                                    </div>
                                </div>                                
                            </form>                            
                        </div>     

                        {selectFileUploadStart && selectFileUploadProgress !== 100  ? (
                            <LinearProgressWithLabel value={selectFileUploadProgress} />
                        ) : null}       


 
                        {selectedFile !== null && selectFileUploadStart === false ? (
                            <div>
                                <p>You have selected file. <Link to="/" style={{cursor: 'pointer'}} onClick={() => setSelectedFile(null)}>Remove</Link></p>
                            </div>
                        ) : null}   

                    </div>    

                    {newPost.map(post => (
                            <div className="blog_sec1" key={post.id}>
                            <div className="blog_title">
                                <div className="title_img">
                                    <img src={post.avatar == null ? "assets/img/user-account.png" : userData.avatar} alt="Sarah Jones"/>
                                </div>
                                <div className="user_des">
                                    <h4>{post.fullname} <span>{post.role}</span></h4>
                                    <p>posted in the (<strong>profile</strong>)</p>
                                </div>
                                <div className="time">
                                    <Moment fromNow>
                                        {post.created_at}
                                    </Moment>
                                </div>
                            </div>

                            {postMedia(post.filepath)}

                            <div className="blog_des">
                                <p>{post.description}</p>
                            </div>
                            <div className="blog_feedback clearfox">
                                <a href="/">
                                    <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>0</span></div>
                                </a>
                                <a href="/">
                                    <div className="love"><img src="assets/img/love.svg" alt=""/><span>0</span></div>
                                </a>
                            </div>

                            <div className="comm_se">
                                <ul>
                                    <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                    <li> <a href="#"> <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                    <li id='share-btn'><span>Share <i className="fa fa-share" aria-hidden="true"> 
                                        </i></span>
                                        <div className="share_post_via">
                                            <ul>
                                                <li><a href="https://www.facebook.com/sharer.php?u="><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                                <li><a href="http://twitter.com/share?text=&url="><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                                <li><a href="https://www.instagram.com/?url="><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li> <a href="#"> <span>Report <i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                </ul>
                            </div>

                            <div className="direct_cmnt_area">
                                <textarea placeholder="write a comment"></textarea>
                                <input type="submit" value="Post" name=""/>
                            </div>                                                                
                        </div>     
                    ))}

                    {load ? 
                        postData
                        .map(post => (
                            <div className="blog_sec1" key={post.id}>
                                <div className="blog_title">
                                    <div className="title_img">                                
                                        <img src={post.avatar == null ? "assets/img/user-account.png" : userData.avatar} alt="Sarah Jones"/>
                                    </div>
                                    <div className="user_des">
                                        <h4>{post.fullname} <span>{post.role}</span></h4>
                                        <p>posted in the (<strong>profile</strong>)</p>
                                    </div>
                                    <div className="time">
                                        <Moment fromNow>
                                            {post.created_at}
                                        </Moment>
                                    </div>
                                </div>
                                

                                {postMedia(post.filepath)}

                                <div className="blog_des">
                                    <p>{post.description}</p>
                                </div>
                                <div className="blog_feedback clearfox">
                                    <a href="/">
                                        <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>0</span></div>
                                    </a>
                                    <a href="/">
                                        <div className="love"><img src="assets/img/love.svg" alt=""/><span>0</span></div>
                                    </a>
                                </div>

                                <div className="comm_se">
                                    <ul>
                                        <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                        <li> <a href="#"> <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                        <li id='share-btn'><span>Share <i className="fa fa-share" aria-hidden="true"> 
                                            </i></span>
                                            <div className="share_post_via">
                                                <ul>
                                                    <li><a href="https://www.facebook.com/sharer.php?u="><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                                    <li><a href="http://twitter.com/share?text=&url="><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                                    <li><a href="https://www.instagram.com/?url="><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li> <a href="#"> <span>Report <i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                    </ul>
                                </div>

                                <div className="direct_cmnt_area">
                                    <textarea placeholder="write a comment"></textarea>
                                    <input type="submit" value="Post" name=""/>
                                </div>                                    
                                
                            </div>

                    )) : null}                    
                    
                    {LoadMoreFeedBtn ? <InfiniteLoader onVisited={() => loadMoreArticles()}/>: null }
                        
                   </div>                
                </div>
            </div>            
        </section>
        </>
    )
};

export default ProfileView;