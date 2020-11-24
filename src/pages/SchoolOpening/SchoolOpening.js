import React, { useEffect, useState, useContext } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import DisplayPost from './DisplayPost';
import { AuthStoreContext } from '../../Store/AuthStore';
import CommunityFeed from './CommunityFeed';

const SchoolOpening = () => {
    const {isAuthenicate, userData} = useContext(AuthStoreContext);    
    const [selectFileUploadProgress, setSelectedFileUploadProgress]  = useState(0);
    const [selectFileUploadStart, setSelectFileUploadStart]  = useState(false);  
    const [selectedFile, setSelectedFile] = useState(null);
    const [newPost, setNewPost] = useState([]);
    const [content, setContent] = useState('');    

    const [states, setStates] = useState([]);
    const [loadStates, setLoadStates] = useState(false);

    const [cities, setCities] = useState([]);
    const [loadCities, setLoadCities] = useState(false);
    
    const [state, setState] = useState('All');
    const [city, setCity] = useState('All');

    const [posts, setPosts] = useState([]);
    const [loadPosts, setLoadPosts] = useState(false);    
    
    const [selectedStateCode, setSelectedStateCode] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null); 

    const [comments, setComments] = useState([]);
    const [loadComments, setLoadComments] = useState(false);

    const [communitiesFeed, setCommunitiesFeed] = useState([]);
    const [loadCommunitiesFeed, setLoadCommunitiesFeed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchUpdates() {
            const resp =  await axios.get('/school-opening-updates');
            const feed = resp.data.data;
            setPosts([...feed]);
            setLoadPosts(true);   
        }

        async function fetchStates() {
            const resp =  await axios.get('/states');
            setStates([...resp.data.data]);
            setLoadStates(true);           
        }   

        async function fetchCommunitiesFeed() {
            const resp = await axios.get('/communities-feed');
            if(resp.data.success) {
                const feed = resp.data.data;
                setCommunitiesFeed(feed);
                setLoadCommunitiesFeed(true);
            }
        }

        fetchStates();
        fetchUpdates();
        fetchCommunitiesFeed();
     }, []);
     

     const stateHandler = async (e) => {
        setState(e.target.value);
        setCity('All');

        if(e.target.value !== 'All') {
            setLoadCities(true);
        }
        else {
            setLoadCities(false);
        }
     }

    const cityHandler = (e) => {
        setCity(e.target.value);
        const selectedIndex = e.target.options.selectedIndex;
        const city_id = e.target.options[selectedIndex].getAttribute('data-key');        
        setSelectedCityId(city_id);
    }     

    const displayStates = () => {    
        return (
            <>
                <div className='select'>
                    <select id="slct" onChange={stateHandler}>
                        <option value='All'>All States</option>
                        {states.map(state =>  <option value={state.name} key={state.code} data-key={state.code}>{state.name}</option>)}
                    </select>
                </div>
            </>
        );
    }     

    const displayCities = () => {
        return (
            <>
                <div className='select'>
                    <select id="slct" onChange={cityHandler}>
                        <option value='All'>Select a City</option>          
                        {states.filter(s => s.name === state).map(state => (
                            <>
                                {state.cities.map(city => (
                                    <>
                                        <option value={city.name}>{city.name}</option>
                                    </>
                                ))}
                            </>
                        ))}             
                    </select>
                </div>
            </>
        );        
    }

    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const formHandler = async (e) => {
        setContent('');
        setSelectedFile(null);

        e.preventDefault();

        var image = null;

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

            const resp =  await axios.post("/upload", data, options); 
            if(resp.data.success === true) { 
                image = resp.data.filePath;
            }
        }               

        const data = {
            content,
            image
        }

        const token = localStorage.getItem('jwt_token');

        const resp = await axios.post('/communities-feed', data, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        if(resp.data.success === true) {
            setContent('');
            setSelectedFile(null);
            setNewPost(newPost => [...newPost, resp.data.data]);
        }   
    }    

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

    return (
        <>
            <div id="main">
                <section className="blog profile_mt clearfix">
                    <div className="container">
                        
                        <div className="opening_sec">
                            <h2>COVID-19 School Update Page</h2>
                        </div>                        
                        
                        <div className="opening_search_form">
                            <div className="row">
                        
                                <div className="col-md-6 col-xs-12">
                                    <label>State</label>

                                    {loadStates === true ? displayStates() : (
                                        <div className='select'><select id="slct" disabled><option>All States</option></select></div>
                                    )}        
                                </div>
                        
                                <div className="col-md-6 col-xs-12">
                                    <label>City</label>
                                    {loadCities === true ? displayCities() : (
                                        <div className='select'><select id="slct" disabled><option>Select a City</option></select></div>
                                    )}
                                </div>
                            </div>
                        </div>    

                        <div className="blog_left school">
                            <div className="padding_all_side opening_schhol">
                                <ul className="list_city">
                                    <li>State: <span>{state === 'All' ? 'All' : state}</span></li>
                                    <li>City: <span>{city === 'All' ? 'All' : city}</span></li>
                                </ul>
                            </div>

                            <div className="post_sec">                                
                                <div className="contribute">                                    
                                    <Link to="/create-school-updates">{isAuthenicate && userData.role === 'admin' ? 'Create School Update' : 'Contribute Information'}</Link>
                                </div>
                            </div>                        


                            <div className="contribute_sec">
                                <div className="conversetion">
                                    <h3>Verified Info & Updates</h3>
                                </div>
                                <div className="black_box"></div>
                            </div>    

                            {loadPosts && state === 'All' & city === 'All' ? (
                                <div className="blog_sec4" style={{height: '300px', overflow: 'scroll'}}>
                                    <div className="opeing_list">                                        
                                        {posts
                                        .map(post => (
                                            <div key={post._id}>
                                                <DisplayPost posts={post}/>
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>                                                                                        
                            ): null }

                            {loadPosts && state !== 'All' && city === 'All' ? ( 
                                <div className="blog_sec4" style={{height: '300px', overflow: 'scroll'}}>
                                    <div className="opeing_list">                                        
                                        {posts
                                        .filter(post => post.state === state)
                                        .map(post => (
                                            <div key={post._id}>
                                                <DisplayPost posts={post}/>
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>                                
                            ) : null}


                            {loadPosts && state !== 'All' && city !== 'All'  ? (
                                <div className="blog_sec4" style={{height: '300px', overflow: 'scroll'}}>
                                    <div className="opeing_list">                                        
                                        {posts
                                        .filter(post => post.state === state && post.city === city)
                                        .map(post => (
                                            <div key={post._id}>
                                                <DisplayPost posts={post}/>
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>
                            ): null }                                                                   


                            <div className="contribute_sec">
                                <div className="conversetion">
                                    <h3>Community Conversation</h3>
                                </div>
                                <div className="black_box"></div>
                            </div>                          
                            
                            {/* Users Feed */}
                            
                            {isAuthenicate  ? (
                                <div className="post_share">
                                    <div className="post_share_area">
                                        <div className="posted_avtar">
                                            <img src={userData.avatar ?  userData.avatar : "/assets/img/user-account.png"} alt={userData.fullname} /> 
                                        </div>
                                        <form method="POST" encType="multipart/form-data" onSubmit={formHandler}>
                                            <div className="post_share_field">
                                                <textarea placeholder="What’s are your mind?" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
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
                                            <p>You have selected file. <button onClick={() => setSelectedFile(null)}>Remove</button></p>
                                        </div>
                                    ) : null}

                                </div>                    
                            ) : null}                            

                            {loadCommunitiesFeed ? (          
                                <div className="blog_sec4" style={{height: '300px', overflow: 'scroll'}}>
                                    <div className="opeing_list">                                        
                                       {newPost.map(post => (
                                           <div key={post._id}>
                                                <CommunityFeed posts={post}/>
                                           </div>
                                       ))}
                                    
                                        {communitiesFeed                                        
                                        .map(post => (
                                            <div key={post.id}>
                                                <CommunityFeed  posts={post}/>     
                                            </div>
                                        ))}     
                                    </div>
                                </div>                                                                                        
                            ): null }

                        </div>{/* end listing  */}

                        <div className="blog_right">
                            <div className="articles_title">
                                <h2>Blog Articles</h2>
                            </div>
                            <div className="articles clearfix">
                                <ul className="d-flex">
                                    <li>
                                        <div className="art_left_img"><img src="assets/img/article1.jpg" alt="" width="92px;"/></div>
                                        <div className="art_des">
                                            <p>My struggle with homeschooling my youngins</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="art_left_img"><img src="assets/img/article2.jpg" alt=""/></div>
                                        <div className="art_des">
                                            <p>COVID19 has led to parents appreciating teachers more</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="art_left_img"><img src="assets/img/article3.jpg" alt=""/></div>
                                        <div className="art_des">
                                            <p>Teachers, like myself, getting used to virtual teaching</p>
                                        </div>
                                    </li>
                                </ul>
                                <a href="#" className="view_more">View More Articles</a>
                            </div>
                            <div className="letest_sec">
                                <div className="articles_title">
                                    <h2>Latest News</h2>
                                </div>
                                <div className="articles clearfix">
                                    <ul className="d-flex">
                                        <li>
                                            <div className="art_left_img"><img src="assets/img/article1.jpg" alt=""/></div>
                                            <div className="art_des">
                                                <p>‘Let’s get those kids back in school!’ Parents rally for…
                                                </p>
                                                <div className="wtrk d_flex1">
                                                    <h5>WTKR News 3 </h5>
                                                    <h5> -July 07, 2020</h5>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                    <a href="#" className="view_more">View More Articles</a>
                                </div>
                            </div>
                            <div className="Recent_topics">
                                <div className="articles_title">
                                    <h2>Recent Forum Topics</h2>
                                </div>
                                <div className="articles clearfix">
                                    <ul className="tag">
                                        <li><a href="#">covid education</a></li>
                                        <li><a href="#">What homeschooling activity do you enjoy?</a></li>
                                        <li><a href="#">Home school meet ups</a></li>
                                        <li><a href="#">Virtual classroom to replace classroom lecturing in future</a></li>
                                        <li><a href="#">Evaluating the effectiveness of distance learning</a></li>
                                    </ul>
                                    <a href="#" className="view_more">View More Topics</a>
                                </div>
                            </div>
                        </div>    
                    </div>                
                </section>
            </div>
        </>
    )
};

export default SchoolOpening;