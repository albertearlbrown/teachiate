import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolOpening = () => {

    const [states, setStates] = useState([]);
    const [loadStates, setLoadStates] = useState(false);

    const [cities, setCities] = useState([]);
    const [loadCities, setLoadCities] = useState(false);
    
    const [posts, setPosts] = useState([]);
    const [loadPosts, setLoadPosts] = useState(false);    

    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {

        async function fetchUpdates() {
            const resp =  await axios.get('https://teachiate-backend.fnmotivations.com/posts');
            setPosts([...resp.data.data]);
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
        const stateCode = e.target.value;
        
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
                <select onChange={stateHandler}>
                    <option value='All'>All States</option>
                    {states.map(i =>  <option data-state={i.state} value={i.state_code} key={i.state_code}>{i.state}</option>)}
                </select>
            </>
        );
    }     

    const displayCities = () => {
        return (
            <>
                <select onChange={cityHandler}>
                    <option value='All'>Select a City</option>
                    {cities.map(i =>  <option value={i.city} key={i.id}>{i.city}</option>)}
                </select>
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
                                        <div><select disabled><option>All States</option></select></div>
                                    )}        
                                </div>
                        
                                <div className="col-md-6 col-xs-12">
                                    <label>City</label>
                                    {loadCities === true ? displayCities() : (
                                        <div><select disabled><option>Select a City</option></select></div>
                                    )}
                                </div>
                            </div>
                        </div>    

                        <div className="blog_left school">
                            <div className="padding_all_side opening_schhol">
                                <ul className="list_city">
                                    <li>State: <span>{state === '' ? 'All' : state}</span></li>
                                    <li>City: <span>{city === '' ? 'All' : city}</span></li>
                                </ul>
                            </div>

                                
                                {loadPosts ? posts.map(post => (
                                    <div className="blog_sec4 open" key={post.id}>
                                        <div className="opeing_list">
                                            <div className="blog_title">
                                                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>Admin</h4>
                                                    <p>{post.state} | USA </p>
                                                </div>
                                                <div className="star_icon"><i className="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                {/* <div className="time"> 2 Days ago</div> */}
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
                                                    <p><a href={post.source_url}>{post.source_name}</a></p>
                                                </div>
                                            </div>

                                            <div className="blog_feedback clearfox">
                                                <a href="#">
                                                    <div className="flower"><img src="/assets/img/flower.svg" alt=""/><span>25</span></div>
                                                </a>
                                                <a href="#">
                                                    <div className="love"><img src="/assets/img/love.svg" alt=""/><span>12</span></div>
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

                                            <div className="blog_title margin_btm">
                                                <div className="title_img"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div className="user_des">
                                                    <h4>Katie Knapp <span>(Parent)</span></h4>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                    <div className="replaied">
                                                        <div className="hour">12 Hours ago</div>
                                                        <div>Replied</div>
                                                    </div>
                                                </div>
                                            </div>                                                                        
                                        </div>
                                    </div>                        
                                )) : null}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

export default SchoolOpening;