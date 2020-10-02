import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/HomeBanner';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import InfiniteLoader from 'react-infinite-loader';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';

const Home = () => {
    const {isAuthenicate, userData} = useContext(AuthStoreContext);    
    const [postData, setPostData] = useState([]);
    const [newPost, setNewPost] = useState([]);
    const [description, setDescription] = useState('');
    const [load, setLoad] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectFileUploadStart, setSelectFileUploadStart]  = useState(false);  
    const [selectFileUploadProgress, setSelectedFileUploadProgress]  = useState(0);
    const [startPost, setStartPost] = useState(0);
    const [LoadMoreFeedBtn, setLoadMoreFeedBtn] = useState(false);    

    useEffect(() => {
        window.scrollTo(0, 0);

        async function fetchPosts() {
            const resp = await axios.get('https://teachiate-backend.fnmotivations.com/thoughts', {
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
       
    }, []);

    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const formHandler = async (e) => {
        setDescription('');
        setSelectedFile(null);

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
                filepath = resp.data.filePath;
            }
        }               

        const data = {
            description,
            filepath
        }

        const token = localStorage.getItem('jwt_token');

        const resp = await axios.post('https://teachiate-backend.fnmotivations.com/thoughts', data, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        if(resp.data.success === true) {
            setDescription('');
            setSelectedFile(null);
            var x = resp.data.data.insertId;
            const createPost = await axios.get(`https://teachiate-backend.fnmotivations.com/thoughts/${x}`);
            if(createPost.data.success) {
                setNewPost(newPost => [...newPost, createPost.data.data]);
            }
        }   
    }

    const loadMoreArticles = async () => {

        setStartPost(startPost + 2);        
        const from = startPost + 2;

        const resp = await axios.get('https://teachiate-backend.fnmotivations.com/thoughts', {
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

    const postComment = async (e) => {
        e.preventDefault();
        const though_id = e.target[0].value;
        const textarea = e.target[1].value;
        const token = localStorage.getItem('jwt_token');
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        const data = {
            post_id: though_id,
            comment_content: textarea,
            post_type: 'thought'
        };        
        const resp = await axios.post('http://localhost:4000/comments', data, config);
        console.log(resp.data);
        e.reset();
    }

    return (
        <>
        {isAuthenicate ? <div style={{marginTop: '100px'}}></div> : <Banner/> }        
        <section className="blog clearfix">
            <div className="container">
                <div className="blog_left">
                    {isAuthenicate ? (
                        <div className="post_share">
                        <h2>Share your thoughts</h2>
                        <div className="post_share_area">
                            <div className="posted_avtar">
                                <img src={userData.avatar ?  userData.avatar : "/assets/img/user-account.png"} alt={userData.fullname} /> 
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
                                                        <input type='file'  name="file"  id="imageUpload5" accept=".mp4, .flv" onChange={(e) => setSelectedFile(e.target.files[0])}/>
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
                    ) : null}
                    
                    {newPost.map(post => (
                            <div className="blog_sec1" key={post.id}>
                            <div className="blog_title">
                                <div className="title_img">
                                    <img src={post.avatar == null ? '/assets/img/user-account.png' : post.avatar } alt=""/>
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

                            {isAuthenicate ? (
                                <>
                                    <div className="direct_cmnt_area">
                                        <form onSubmit={postComment}>
                                            <input type='hidden' name='though_id' value={post.id}/>
                                            <textarea placeholder="write a comment" name='textarea'></textarea>
                                            <input type="submit" value="Post"/>
                                        </form>
                                    </div>                                    
                                    </>
                            ) : null}                                            
                            
                        </div>     
                    ))}

                    {load ? 
                        postData
                        .map(post => (
                            <div className="blog_sec1" key={post.id}>
                                <div className="blog_title">
                                    <div className="title_img">
                                        <img src={post.avatar == null ? '/assets/img/user-account.png' : post.avatar } alt=""/>
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
                                    <a href="#">
                                        <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                    </a>
                                    <a href="#">
                                        <div className="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                    </a>
                                </div>                                

                                {isAuthenicate ? (
                                    <>
                                        <div className="direct_cmnt_area">
                                            <form onSubmit={postComment}>
                                                <input type='hidden' name='though_id' value={post.id}/>
                                                <textarea placeholder="write a comment" ></textarea>
                                                <input type="submit" value="Post" name=""/>
                                            </form>
                                        </div>                                    
                                        </>
                                ) : null}                                            
                                
                            </div>
                    )) : null}                    
                    
                    {LoadMoreFeedBtn ? <InfiniteLoader onVisited={() => loadMoreArticles()}/>: null }
                </div>

                <div class="blog_right">
                    <div class="articles_title">
                        <h2>Blog Articles</h2>
                    </div>
                    <div class="articles clearfix">
                        <ul class="d-flex">
                            <li>
                                <div class="art_left_img"><img src="assets/img/article1.jpg" width="92px;" alt=""/></div>
                                <div class="art_des">
                                    <p>My struggle with homeschooling my youngins</p>
                                </div>
                            </li>
                            <li>
                                <div class="art_left_img"><img src="assets/img/article2.jpg" alt=""/></div>
                                <div class="art_des">
                                    <p>COVID19 has led to parents appreciating teachers more</p>
                                </div>
                            </li>
                            <li>
                                <div class="art_left_img"><img src="assets/img/article3.jpg" alt=""/></div>
                                <div class="art_des">
                                    <p>Teachers, like myself, getting used to virtual teaching</p>
                                </div>
                            </li>
                        </ul>
                        <a href="#" class="view_more">View More Articles</a>
                    </div>

                    <div class="Recent_topics">
                        <div class="articles_title">
                            <h2>Recent Forum Topics</h2>
                        </div>
                        <div class="articles clearfix">
                            <ul class="tag">
                                <li><a href="#">covid education</a></li>
                                <li><a href="#">What homeschooling activity do you enjoy?</a></li>
                                <li><a href="#">Home school meet ups</a></li>
                                <li><a href="#">Virtual classroom to replace classroom lecturing in future</a></li>
                                <li><a href="#">Evaluating the effectiveness of distance learning</a></li>
                            </ul>
                            <a href="#" class="view_more">View More Articles</a>

                        </div>
                    </div>
                    <div class="Recent_topics_form">
                        <div class="articles_title">
                            <h2>Recent Forums</h2>
                        </div>
                        <div class="articles clearfix">
                            <ul class="tag">
                                <li><a href="#">General Community Chat </a></li>
                                <li><a href="#">Higher Education Chat </a></li>
                                <li><a href="#">Parental Connection </a></li>
                                <li><a href="#">Parents and Teachers Lounge </a></li>
                                <li><a href="#">Teachers Lounge</a></li>
                            </ul>
                            <a href="#" class="view_more">View More Articles</a>
                        </div>                        
                    </div>
                </div>
            </div>
        </section>

        </>
    );
}

export default Home;