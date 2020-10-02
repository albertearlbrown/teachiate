import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

const SchoolOpening = () => {

    const [states, setStates] = useState([]);
    const [loadStates, setLoadStates] = useState(false);

    const [cities, setCities] = useState([]);
    const [loadCities, setLoadCities] = useState(false);
    
    const [posts, setPosts] = useState([]);
    const [loadPosts, setLoadPosts] = useState(false);    

    const [state, setState] = useState('All');
    const [city, setCity] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchUpdates() {
            const resp =  await axios.get('https://teachiate-backend.fnmotivations.com/covid_feed');
            const featured_posts = resp.data.data.featured_posts; 
            const posts = resp.data.data.posts;
            const all = featured_posts.concat(posts);
            setPosts([...all]);
            setLoadPosts(true);   
        }

        async function fetchStates() {
             const resp =  await axios.get('https://teachiate-backend.fnmotivations.com/states');
             setStates([...resp.data.data]);
             setLoadStates(true);           
        }
        
        fetchStates();
        fetchUpdates();
     }, []);
 
     const stateHandler = async (e) => {
        setState(e.target.value);
        setCity('All');

        const selectedIndex = e.target.options.selectedIndex;
        const stateCode = e.target.options[selectedIndex].getAttribute('data-key');
        
         if(e.target.value !== 'All') {
             const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/cities/${stateCode}`);
             setCities([...resp.data.data]);
             setLoadCities(true);
         }
         else {
             setCities([]);
             setLoadCities(false);
         }
     }

     const cityHandler = (e) => {
        setCity(e.target.value);
     }     

     const displayStates = () => {    
        return (
            <>
                <div className='select'>
                    <select id="slct" onChange={stateHandler}>
                        <option value='All'>All States</option>
                        {states.map(i =>  <option value={i.state} data-key={i.state_code} key={i.state_code}>{i.state}</option>)}
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
                        {cities.map(i =>  <option value={i.city} key={i.id}>{i.city}</option>)}
                    </select>
                </div>
            </>
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
                        

                            {loadPosts && state === 'All' & city === 'All' ? (
                                <div className="blog_sec4 open">
                                    <div className="opeing_list">                                        
                                    {posts
                                    .filter(post => post.role === 'Admin')
                                    .map(post => (
                                        <>
                                            <div className="blog_title"  key={post.id}>
                                                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>{post.fullname} ({post.role})</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                {/* <div className="star_icon">
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div> */}
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                            
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>


                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p>
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                                                            State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>  

                                            <div class="blog_feedback clearfox">
                                                <a href="#">
                                                    <div class="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div class="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>                                          

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div>

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    ))}                                        
                                    </div>
                                </div>                                                                                        
                            ): null }

                            {loadPosts && state !== 'All' && city === 'All' ? ( 
                                <div className="blog_sec4 open">
                                    <div className="opeing_list">
                                    {posts
                                    .filter(post => post => post.role === 'Admin' && post.state === state)
                                    .map(post => (
                                        <>
                                            <div className="blog_title" key={post.id}>
                                                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>Admin</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                <div className="star_icon">
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                        
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>

                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i>
                                                        State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>                                                                      

                                            <div class="blog_feedback clearfox">
                                                <a href="#">
                                                    <div class="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div class="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>                                            

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div>                                            

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </>
                                        ))}
                                    </div>
                                </div>                                
                            ) : null}


                            {loadPosts && state !== 'All' && city !== 'All' ? (
                                posts
                                .filter(post => post => post.role === 'Admin' && post.state === state  && post.city === city)
                                .map(post => (
                                    <div className="blog_sec4 open" key={post.id}>
                                        <div className="opeing_list">
                                            <div className="blog_title">
                                                <div className="title_img">
                                                    <img src="assets/img/admin-img.png" alt=""/>
                                                </div>
                                                <div className="user_des">
                                                    <h4>{post.fullname}</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                <div className="star_icon"><i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                            
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>


                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p>
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                                                         State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>   

                                            <div className="blog_feedback clearfox">
                                                <a href="#">
                                                    <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div className="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div> 

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>                                                                                       

                                        </div>
                                    </div>
                                ))
                            ): null }                                                                   

                            <div className="post_sec">
                                <div class="contribute"><Link to="/contribute-information">Contribute Information</Link></div>
                            </div>

                            {/* Users Feed */}
                            {loadPosts && state === 'All' & city === 'All' ? (
                                <div className="blog_sec4 open">
                                    <div className="opeing_list">                                        
                                    {posts
                                    .filter(post => post.role !== 'Admin')
                                    .map(post => (
                                        <>
                                            <div className="blog_title"  key={post.id}>
                                                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>{post.fullname} ({post.role})</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                {/* <div className="star_icon">
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div> */}
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                            
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>


                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p>
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                                                            State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>  

                                            <div class="blog_feedback clearfox">
                                                <a href="#">
                                                    <div class="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div class="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>                                          

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div>

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}                                        
                                    </div>
                                </div>                                                                                        
                            ): null }

                            {loadPosts && state !== 'All' && city === 'All' ? ( 
                                <div className="blog_sec4 open">
                                    <div className="opeing_list">
                                    {posts
                                    .filter(post => post => post.role !== 'Admin' && post.state === state)
                                    .map(post => (
                                        <>
                                            <div className="blog_title" key={post.id}>
                                                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>Admin</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                <div className="star_icon">
                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                        
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>

                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i>
                                                        State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>                                                                      

                                            <div class="blog_feedback clearfox">
                                                <a href="#">
                                                    <div class="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div class="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>              

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div>

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>                                                                                                                                                                 
                                        </>
                                        ))}
                                    </div>
                                </div>                                
                            ) : null}


                            {loadPosts && state !== 'All' && city !== 'All' ? (
                                posts
                                .filter(post => post => post.role !== 'Admin' && post.state === state  && post.city === city)
                                .map(post => (
                                    <div className="blog_sec4 open" key={post.id}>
                                        <div className="opeing_list">
                                            <div className="blog_title">
                                                <div className="title_img">
                                                    <img src="assets/img/admin-img.png" alt=""/>
                                                </div>
                                                <div className="user_des">
                                                    <h4>{post.fullname}</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                <div className="star_icon"><i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="time"> <Moment fromNow>{post.created_at}</Moment></div>
                                            </div>
                                            
                                            {post.filepath !== null ? (
                                                <div className="blog_img_holder1"><img src={post.filepath} alt=""/></div>
                                            )  : null}

                                            <div className="blog_des">
                                                <div className="admin_details">
                                                    <div className="haeding">
                                                        <h4>{post.title}</h4>
                                                    </div>
                                                    <div className="reoping_date">
                                                        {/* <h6><i className="fa fa-clock-o" aria-hidden="true"></i>Re-Opening Date: <span>28th September, 2020</span></h6> */}
                                                    </div>
                                                </div>
                                                <p>{post.description}</p>
                                            </div>


                                            <div className="opening_flex">
                                                <div className="locaton">
                                                    <p>
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                                                        State: <span>{post.state}</span> </p>
                                                        <p>City: <span>{post.city}</span></p>
                                                </div>
                                                <div className="bbc_news">
                                                    <p><a href={post.source_url}>Source</a></p>
                                                </div>
                                            </div>   

                                            <div className="blog_feedback clearfox">
                                                <a href="#">
                                                    <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>{post.total_comments}</span></div>
                                                </a>
                                                <a href="#">
                                                    <div className="love"><img src="assets/img/love.svg" alt=""/><span>{post.total_likes}</span></div>
                                                </a>
                                            </div>

                                            <div class="comm_se">
                                                <ul>
                                                    <li><a href="#"> <span>like <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Comment <i class="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                                                    <li> <a href="#"> <span>Share <i class="fa fa-share" aria-hidden="true"></i>
                                                            </span></a></li>
                                                    <li> <a href="#"> <span>Report <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                                                </ul>
                                            </div>  

                                            <div class="blog_title margin_btm">
                                                <div class="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div class="replaied">
                                                        <div class="hour">12 Hours ago</div>
                                                    </div>
                                                </div>
                                            </div>                                                                                      

                                        </div>
                                    </div>
                                ))
                            ): null }                                                                                                       
                        </div>{/* end listing  */}

                        <div class="blog_right">
                            <div class="articles_title">
                                <h2>Blog Articles</h2>
                            </div>
                            <div class="articles clearfix">
                                <ul class="d-flex">
                                    <li>
                                        <div class="art_left_img"><img src="assets/img/article1.jpg" alt="" width="92px;"/></div>
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
                            <div class="letest_sec">
                                <div class="articles_title">
                                    <h2>Latest News</h2>
                                </div>
                                <div class="articles clearfix">
                                    <ul class="d-flex">
                                        <li>
                                            <div class="art_left_img"><img src="assets/img/article1.jpg" alt=""/></div>
                                            <div class="art_des">
                                                <p>‘Let’s get those kids back in school!’ Parents rally for…
                                                </p>
                                                <div class="wtrk d_flex1">
                                                    <h5>WTKR News 3 </h5>
                                                    <h5> -July 07, 2020</h5>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                    <a href="#" class="view_more">View More Articles</a>
                                </div>
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
                                    <a href="#" class="view_more">View More Topics</a>
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