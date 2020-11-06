import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Post from './Post';

function Forum() {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [trendingTopic, setTrendingTopic] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [categorySelected, setSelectCategory] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchPosts() {
           const resp = await axios.get('http://localhost:4000/forum');
           
           if(resp.data.success) {
            setPosts([...resp.data.data]);
            setLoad(true);        
           }
        }

        fetchPosts();
    },[]);


    const searchHandler = (e) => {
        e.preventDefault();
        alert('Search...');
    }

    return (
        <>
           <PageTitle title='Forum'/>

            <section className="inner_content forums_inner_page">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">                        
                            <form onSubmit={searchHandler}>    
                                <div className="search_flex text-center">
                                    <input type="search" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control"/>
                                    <button className="search_btn" type="submit"><img src="assets/img/search-icon.png" alt=""/></button>
                                </div>
                             </form>
                        </div>
                    </div>
                    

                    <Link to="/forum-create-post" className='btn btn-primary create_blog_btn create_forum_btn'>
                        <span>Post Your Forum Topic</span>
                    </Link>

                    <div className="trend_topics">
                    <h2>Trending Topics</h2>
                        <ul>
                            <li><a href="#">#<span  onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Youth Process</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Motivation for Kids</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teacher Appreciation</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teachers</span></a></li>
                            <li><a href="#">#<span  onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Parents</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Options for College and Beyond</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teachers</span></a></li>
                        </ul>
                    </div>

                    <div className="forum clearfix">
                        <div className="forum_left">
                            <ul className="left_listing">
                                {load ? (
                                    <div>
                                        {categorySelected === null && trendingTopic === null  ? (
                                            <>
                                                {posts.length > 0 ? posts.map(post => <Post post={post} key={post._id}/>) : <p>There are no posts</p>}                                                
                                            </>
                                        ) : null}

                                        {categorySelected !== null && trendingTopic === null ? (
                                            <>
                                                {posts.filter(post => post.category === categorySelected).length > 0 ? (
                                                    posts
                                                    .filter(post => post.category === categorySelected)
                                                    .map(post => <Post post={post} key={post._id}/>)
                                                )  : <p>There are no posts</p>}
                                            </>     
                                        ) : null}

                                        {categorySelected === null &&  trendingTopic !== null ? (
                                            <>
                                                {posts                                                
                                                .map(post => (
                                                    <>
                                                        {post.tags.filter(tage => tage.label === trendingTopic)
                                                        .map(tage => (
                                                            <>
                                                                <Post post={post} key={post._id}/>
                                                            </>
                                                        ))} 
                                                    </>     
                                                ))}
                                            </>     
                                        ) : null}
                                    </div>                                    
                                ):  null}     
                            </ul>
                        </div>

                        <div className="forum_right">
                            <div className="list_chat">
                                <ul>
                                    <li className={categorySelected === null ? 'active' : null} onClick={(e) => setSelectCategory(null)}><Link to="#">All</Link></li>                                    
                                    <li className={categorySelected === 'General Community Chat' ? 'active' : null} onClick={(e) => setSelectCategory(e.target.text)}><Link to="#">General Community Chat</Link></li>
                                    <li className={categorySelected === 'Higher Education Chat' ? 'active' : null} onClick={(e) => setSelectCategory(e.target.text)}><Link to="#">Higher Education Chat</Link></li>
                                    <li className={categorySelected === 'Parental Connection' ? 'active' : null} onClick={(e) => setSelectCategory(e.target.text)}><Link to="#">Parental Connection</Link></li>
                                    <li className={categorySelected === 'Parents and Teachers Lounge' ? 'active' : null} onClick={(e) => setSelectCategory(e.target.text)}><Link to="#">Parents and Teachers Lounge</Link></li>
                                    <li className={categorySelected === 'Teachers Lounge' ? 'active' : null} onClick={(e) => setSelectCategory(e.target.text)}><Link to="#">Teachers Lounge</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}



export default Forum;