import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function Forum() {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [keyword, setKeyword] = useState(null);
    const [categorySelected, setSelectCategory] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchPosts() {
           const resp = await axios.get('https://teachiate-backend.fnmotivations.com/forum');
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
                                <div className="search_flex text-center mt_30">
                                    <input type="search" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control"/>
                                    <button className="search_btn" type="submit"><img src="assets/img/search-icon.png" alt=""/></button>
                                </div>
                             </form>
                        </div>
                    </div>

                    <div className="forum clearfix">
                        <div className="forum_left">
                            <div className="left_title">
                                {categorySelected === null ? <h2>All</h2> : <h2>{categorySelected}</h2>}
                            </div>

                            <ul className="left_listing">

                                {load ? (
                                    <div>
                                        {categorySelected === null ? (
                                            <div>
                                                {
                                                    posts.length > 0 ? (
                                                        posts.map(post => (
                                                            <li key={post.forum_post_id}>
                                                                <div className="catagory_forum"><a href="#">{post.subcategory}</a></div>
                                                                <div className="img_holder">
                                                                    <img src={post.avatar === null ? '/assets/img/user-account.png' : post.avatar} alt="" height='65'/>
                                                                </div>
                                                                <div className="img_des">
                                                                    <h4>{post.fullname}<span>{post.category}</span></h4>
                                                                </div>
                                                                <div className="clearfix"></div>
                                                                <div className="des_p">
                                                                    <p>{post.description}</p>
                                                                </div>
                                                                <div className="read_more_btn"><Link to={'forum/' + post.forum_post_id}>Read More</Link></div>
                                                                <div className="month">
                                                                    <p><Moment fromNow>{post.created_at}</Moment></p>
                                                                </div>
                                                            </li>                                    
                                                        ))                                                       
                                                    ) : <p>There are no posts</p>                                                 
                                                }                                                
                                            </div>
                                        ) : null}


                                        {categorySelected !== null ? (
                                            <div>
                                                { posts.filter(post => post.category === categorySelected).length > 0 ? (
                                                    posts.filter(post => post.category === categorySelected).map(post => (
                                                        <li key={post.forum_post_id}>
                                                            <div className="catagory_forum"><a href="#">{post.subcategory}</a></div>
                                                            <div className="img_holder">
                                                                <img src={post.avatar === null ? '/assets/img/user-account.png' : post.avatar} alt="" height='65'/>
                                                            </div>
                                                            <div className="img_des">
                                                                <h4>{post.fullname}<span>{post.category}</span></h4>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="des_p">
                                                                <p>{post.description}</p>
                                                            </div>
                                                            <div className="read_more_btn"><Link to={'forum/'+post.forum_post_id}>Read More</Link></div>
                                                            <div className="month">
                                                                <p><Moment fromNow>{post.created_at}</Moment></p>
                                                            </div>
                                                        </li>                                    
                                                    ))                                                                                                                                                                                                                                    
                                                )  : <p>There are no posts</p>}
                                            </div>     
                                        ) : null}   

                                    </div>                                    
                                ): <p>Loading...</p>} 

                               

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