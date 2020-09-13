import React, { useEffect, useState } from 'react';
import Banner from '../../components/HomeBanner';
import { useStoreState } from 'easy-peasy';
import axios from 'axios';

const Home = () => {
    
    const auth = useStoreState(state => state.islogin);
    const [postData, setPostData] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchPosts() {
            const resp = await axios.get('https://teachiate-backend.fnmotivations.com/posts');
            if(resp.data.success === true) {
                setPostData([...resp.data.data]);        
                setLoad(true);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
         {auth ? <div style={{marginTop: '100px'}}></div> : <Banner/> }        

        <section className="blog clearfix">
            <div className="container">
                <div className="blog_left">

                    {load ? 
                        postData
                        .filter(post => post.spotlight === 0)
                        .map(post => (

                            <div className="blog_sec1">
                                <div className="blog_title">
                                    <div className="title_img"><img src="assets/img/katei-knapp.png" alt=""/></div>
                                    <div className="user_des">
                                        <h4>Katie Knapp <span>(Teacher)</span></h4>
                                        <p>posted an update in the group <strong>Teachers library </strong> </p>
                                    </div>
                                    <div className="time">11 hours ago</div>
                                </div>
                                <div className="blog_img_holder1"><img src="assets/img/blog-img1.jpg" alt=""/></div>
                                <div className="blog_des">
                                    <p>“The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.”
        
                                        <span>- William Arthur Ward</span></p>
                                </div>
                                <div className="blog_feedback clearfox">
                                    <a href="/">
                                        <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>25</span></div>
                                    </a>
                                    <a href="/">
                                        <div className="love"><img src="assets/img/love.svg" alt=""/><span>12</span></div>
                                    </a>
                                    <a href="/">
                                        <div className="share"><span>share</span><img src="assets/img/share.svg" alt=""/></div>
                                    </a>
                                </div>
                            </div>

                    )) : null}                    

                    <a href="/" className="view_more mb-30">Load More Feeds</a>
                </div>



                <div className="blog_right">
                    <div className="articles_title">
                        <h2>Blog Articles</h2>
                    </div>
                    <div className="articles clearfix">
                        <ul className="d-flex">
                            <li>
                                <div className="art_left_img"><img src="assets/img/article1.jpg" width="92px;" alt=""/></div>
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
                        <a href="/" className="view_more">View More Articles</a>
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
                            <a href="/" className="view_more">View More Articles</a>
                        </div>
                    </div>
                    <div className="recent_blog_comments">
                        <div className="comment_title"><span><img src="assets/img/comments.png" alt=""/></span>Recent Blog Comments</div>
                        <div className="d_flex2">
                            <div className="sad_img"><img src="assets/img/sad.png" alt=""/></div>
                            <div className="des">
                                <h4>Sorry,There are no comments to display.</h4>
                            </div>
                        </div>
                    </div>

                    <div className="Recent_topics">
                        <div className="articles_title">
                            <h2>Recent Forum Topics</h2>
                        </div>
                        <div className="articles clearfix">
                            <ul className="tag">
                                <li><a href="/">covid education</a></li>
                                <li><a href="/">What homeschooling activity do you enjoy?</a></li>
                                <li><a href="/">Home school meet ups</a></li>
                                <li><a href="/">Virtual classNameroom to replace classNameroom lecturing in future</a></li>
                                <li><a href="/">Evaluating the effectiveness of distance learning</a></li>
                            </ul>
                            <a href="/" className="view_more">View More Articles</a>

                        </div>
                    </div>
                    <div className="Recent_topics_form">
                        <div className="articles_title">
                            <h2>Recent Forums</h2>
                        </div>
                        <div className="articles clearfix">
                            <ul className="tag">
                                <li><a href="/">General Community Chat </a></li>
                                <li><a href="/">Higher Education Chat </a></li>
                                <li><a href="/">Parental Connection </a></li>
                                <li><a href="/">Parents and Teachers Lounge </a></li>
                                <li><a href="/">Teachers Lounge</a></li>
                            </ul>
                            <a href="/" className="view_more">View More Articles</a>

                        </div>
                    </div>
                    <div className="Groups">
                        <div className="articles_title">
                            <h2>Groups</h2>
                        </div>
                        <div className="articles clearfix">
                            <ul className="tabs">
                                <li className="active" rel="tab1">Newest</li>
                                <li rel="tab2">Active</li>
                                <li rel="tab3">Popular</li>
                                <li rel="tab4">Alphabetical</li>
                            </ul>
                            <div className="tab_container">
                                <h3 className="d_active tab_drawer_heading" rel="tab1">Newest</h3>
                                <div id="tab1" className="tab_content">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/t.png" alt=""/>
                                                    <h4>Test group<span>created 2 weeks</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/martial-art.png" alt=""/>
                                                    <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/gift-child.png" alt=""/>
                                                    <h4>Homeschooling gifted
                                                        children<span>created 2 weeks, 4 days ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/student.png" alt=""/>
                                                    <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="tab_drawer_heading" rel="tab2">Active</h3>
                                <div id="tab2" className="tab_content">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/t.png" alt=""/>
                                                    <h4>Test group<span>created 2 weeks</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/martial-art.png" alt=""/>
                                                    <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/gift-child.png" alt=""/>
                                                    <h4>Homeschooling gifted
                                                        children<span>created 2 weeks, 4 days ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/student.png" alt=""/>
                                                    <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="tab_drawer_heading" rel="tab3">Popular</h3>
                                <div id="tab3" className="tab_content">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/t.png" alt=""/>
                                                    <h4>Test group<span>created 2 weeks</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/martial-art.png" alt="" />
                                                    <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/gift-child.png" alt="" />
                                                    <h4>Homeschooling gifted
                                                        children<span>created 2 weeks, 4 days ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/student.png" alt="" />
                                                    <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="tab_drawer_heading" rel="tab4">Alphabetical</h3>
                                <div id="tab4" className="tab_content">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/t.png" alt="" />
                                                    <h4>Test group<span>created 2 weeks</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/martial-art.png" alt="" />
                                                    <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/gift-child.png" alt="" />
                                                    <h4>Homeschooling gifted
                                                        children<span>created 2 weeks, 4 days ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6">
                                            <div className="boder_box text-center">
                                                <a href="/">
                                                    <img src="assets/img/student.png" alt="" />
                                                    <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>

        </>
    );
}

export default Home;